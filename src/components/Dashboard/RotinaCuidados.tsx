import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSession } from '../../auth/Session'
import { ApiError } from '../../services/api'
import {
  excluirRegistroCuidado,
  habilitarAreaDaPessoa,
  listarAreasDaPessoa,
  listarCatalogoAreas,
  listarRegistrosCuidado,
  salvarRegistroCuidado,
  statusLabels,
  type AreaCuidado,
  type DadosRegistro,
  type RegistroCuidado,
  type StatusRegistro,
} from '../../services/registrosCuidado'
import { usePessoasAcompanhadas } from './usePessoasAcompanhadas'
import { usePermissaoPessoa } from './usePermissaoPessoa'

const campo = 'mt-1 block w-full rounded-xl border border-brand-border bg-white px-3 py-2 text-sm font-normal'
const botao = 'rounded-xl border border-brand-border px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50'
const novoRegistro: DadosRegistro = {
  areaId: 0,
  titulo: '',
  detalhe: null,
  dataPrevista: null,
  dataRealizado: null,
  status: 'PENDENTE',
}

function mensagem(error: unknown) {
  return error instanceof Error ? error.message : 'Não foi possível concluir a operação.'
}

function HabilitarArea({ pessoaId, token, areas, onAtualizar, onFechar, onSemPermissao }: {
  pessoaId: number
  token: string
  areas: AreaCuidado[]
  onAtualizar: (areas: AreaCuidado[]) => void
  onFechar: () => void
  onSemPermissao: (mensagem: string) => void
}) {
  const { expirar } = useSession()
  const requisicao = useRef<AbortController | null>(null)
  const enviando = useRef(false)
  const [catalogo, setCatalogo] = useState<AreaCuidado[] | null>(null)
  const [areaId, setAreaId] = useState(0)
  const [ocupado, setOcupado] = useState(false)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const disponiveis = catalogo?.filter(({ id }) => !areas.some((area) => area.id === id)) ?? []

  useEffect(() => {
    const controller = new AbortController()
    requisicao.current = controller
    listarCatalogoAreas(token, controller.signal)
      .then((resultado) => { if (!controller.signal.aborted) setCatalogo(resultado) })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && error.status === 401) expirar(token)
        else setErro(mensagem(error))
      })
    return () => controller.abort()
  }, [token, expirar])

  async function habilitar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const signal = requisicao.current?.signal
    if (!signal || signal.aborted || enviando.current || !disponiveis.some(({ id }) => id === areaId)) return
    enviando.current = true
    setOcupado(true)
    setErro('')
    setAviso('')
    let conflito = ''
    let habilitada = false
    try {
      try {
        await habilitarAreaDaPessoa(pessoaId, areaId, token, signal)
        habilitada = true
      } catch (error) {
        if (!(error instanceof ApiError) || error.status !== 409) throw error
        conflito = mensagem(error)
      }
      const atualizadas = await listarAreasDaPessoa(pessoaId, token, signal)
      if (signal.aborted) return
      onAtualizar(atualizadas)
      setAreaId(0)
      if (conflito) setErro(conflito)
      else setAviso('Área habilitada.')
    } catch (error) {
      if (signal.aborted) return
      if (error instanceof ApiError && error.status === 401) expirar(token)
      else if (habilitada || conflito) {
        setErro([conflito || 'Área habilitada.', 'Falha ao atualizar as áreas da pessoa.', mensagem(error)].join(' '))
        setAreaId(0)
      } else if (error instanceof ApiError && error.status === 403) {
        onSemPermissao('Sem permissão para habilitar áreas desta pessoa. ' + mensagem(error))
      } else setErro(mensagem(error))
    } finally {
      enviando.current = false
      if (!signal.aborted) setOcupado(false)
    }
  }

  return (
    <form onSubmit={habilitar} className="space-y-3 rounded-2xl border border-brand-border p-4">
      {!catalogo && !erro && <p role="status" className="text-sm text-brand-muted">Carregando catálogo de áreas...</p>}
      {catalogo && !disponiveis.length && (
        <p role="status" className="text-sm text-brand-muted">Nenhuma área disponível para habilitar.</p>
      )}
      {disponiveis.length > 0 && (
        <label className="block text-sm font-bold text-brand-ink">Área para habilitar
          <select required disabled={ocupado} className={campo} value={areaId || ''}
            onChange={(event) => setAreaId(Number(event.target.value))}>
            <option value="">Selecione uma área do catálogo</option>
            {disponiveis.map(({ id, nome }) => <option key={id} value={id}>{nome}</option>)}
          </select>
        </label>
      )}
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      {aviso && <p role="status" className="text-sm text-brand-success">{aviso}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={!areaId || ocupado} className={botao + ' bg-brand-primary text-white'}>
          {ocupado ? 'Habilitando...' : 'Confirmar habilitação'}
        </button>
        <button type="button" disabled={ocupado} className={botao} onClick={onFechar}>Fechar</button>
      </div>
    </form>
  )
}

function FormularioRegistro({ areas, registro, ocupado, onSalvar, onCancelar }: {
  areas: AreaCuidado[]
  registro: RegistroCuidado | null
  ocupado: boolean
  onSalvar: (dados: DadosRegistro) => void
  onCancelar: () => void
}) {
  const [dados, setDados] = useState<DadosRegistro>(() => registro ? {
    ...registro,
    areaId: areas.some(({ id }) => id === registro.areaId) ? registro.areaId : 0,
  } : { ...novoRegistro, areaId: areas.length === 1 ? areas[0].id : 0 })
  const [erro, setErro] = useState('')

  function salvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (ocupado) return
    const titulo = dados.titulo.trim()
    if (!titulo || !areas.some(({ id }) => id === dados.areaId) || (!dados.dataPrevista && !dados.dataRealizado)) {
      setErro('Informe o título, uma área habilitada e pelo menos uma data.')
      return
    }
    setErro('')
    const { areaId, status, dataPrevista, dataRealizado, usuarioRealizouId, medicamentoId, consultaId, medida, medida2, unidade } = dados
    onSalvar({
      areaId, titulo, status, dataPrevista, dataRealizado, usuarioRealizouId,
      medicamentoId, consultaId, medida, medida2, unidade, detalhe: dados.detalhe?.trim() || null,
    })
  }

  return (
    <form onSubmit={salvar} className="space-y-3 rounded-2xl border border-brand-border p-4">
      <h4 className="font-bold text-brand-ink">{registro ? 'Editar registro' : 'Novo registro'}</h4>
      <fieldset disabled={ocupado} className="grid gap-3 text-sm font-bold text-brand-ink sm:grid-cols-2">
        <label>Título
          <input required maxLength={100} className={campo} value={dados.titulo}
            onChange={(event) => setDados({ ...dados, titulo: event.target.value })} />
        </label>
        <label>Área de cuidado
          <select required className={campo} value={dados.areaId || ''}
            onChange={(event) => setDados({ ...dados, areaId: Number(event.target.value) })}>
            <option value="">Selecione uma área habilitada</option>
            {areas.map(({ id, nome }) => <option key={id} value={id}>{nome}</option>)}
          </select>
        </label>
        <label className="sm:col-span-2">Detalhe
          <textarea maxLength={300} rows={2} className={campo} value={dados.detalhe ?? ''}
            onChange={(event) => setDados({ ...dados, detalhe: event.target.value })} />
        </label>
        <label>Status
          <select className={campo} value={dados.status}
            onChange={(event) => setDados({ ...dados, status: event.target.value as StatusRegistro })}>
            {Object.entries(statusLabels).map(([valor, rotulo]) => <option key={valor} value={valor}>{rotulo}</option>)}
          </select>
        </label>
        <label>Data prevista
          <input type="datetime-local" step="any" className={campo} value={dados.dataPrevista ?? ''}
            onChange={(event) => setDados({ ...dados, dataPrevista: event.target.value || null })} />
        </label>
        <label>Data de realização
          <input type="datetime-local" step="any" className={campo} value={dados.dataRealizado ?? ''}
            onChange={(event) => setDados({ ...dados, dataRealizado: event.target.value || null })} />
        </label>
      </fieldset>
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      <div className="flex flex-wrap gap-2">
        <button type="submit" disabled={ocupado} className={botao + ' bg-brand-primary text-white'}>
          {ocupado ? 'Salvando...' : 'Salvar registro'}
        </button>
        <button type="button" disabled={ocupado} className={botao} onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  )
}

type PerfilRotina = 'familiar' | 'cuidador' | 'pessoa'

function RegistrosDaPessoa({ pessoaId, token, perfil, atualizarPessoas }: {
  pessoaId: number
  token: string
  perfil: PerfilRotina
  atualizarPessoas: () => void
}) {
  const somenteLeitura = perfil === 'pessoa'
  const { permissao, erro: erroPermissao, revalidar } = usePermissaoPessoa(pessoaId, token)
  const acessoConfirmado = permissao !== null
  const { expirar } = useSession()
  const [registros, setRegistros] = useState<RegistroCuidado[] | null>(null)
  const [areas, setAreas] = useState<AreaCuidado[] | null>(null)
  const [erro, setErro] = useState('')
  const [erroAreas, setErroAreas] = useState('')
  const [erroAcao, setErroAcao] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [formulario, setFormulario] = useState<{ registro: RegistroCuidado | null } | null>(null)
  const [habilitandoArea, setHabilitandoArea] = useState(false)
  const podeTentarEscrever = !somenteLeitura && permissao === 'REGISTRAR'

  useEffect(() => {
    if (!podeTentarEscrever) {
      setFormulario(null)
      setHabilitandoArea(false)
    }
  }, [podeTentarEscrever])

  useEffect(() => {
    if (!acessoConfirmado) {
      setRegistros(null)
      setAreas(null)
      return
    }
    const controller = new AbortController()
    const { signal } = controller
    setErro('')
    setErroAreas('')
    listarRegistrosCuidado(pessoaId, token, signal)
      .then((resultado) => { if (!signal.aborted) setRegistros(resultado) })
      .catch((error: unknown) => {
        if (signal.aborted) return
        if (error instanceof ApiError && error.status === 401) expirar(token)
        else {
          setErro('Falha ao listar registros. ' + mensagem(error))
          if (error instanceof ApiError && (error.status === 403 || error.status === 404)) {
            setRegistros(null)
            atualizarPessoas()
          }
        }
      })
    if (!somenteLeitura) {
      listarAreasDaPessoa(pessoaId, token, signal)
        .then((resultado) => { if (!signal.aborted) setAreas(resultado) })
        .catch((error: unknown) => {
          if (signal.aborted) return
          if (error instanceof ApiError && error.status === 401) expirar(token)
          else setErroAreas('Falha ao carregar áreas de cuidado. ' + mensagem(error))
        })
    }
    return () => controller.abort()
  }, [pessoaId, token, expirar, somenteLeitura, atualizarPessoas, acessoConfirmado])

  function informarEscritaRecusada(texto: string) {
    revalidar()
    setFormulario(null)
    setHabilitandoArea(false)
    setErroAcao(texto)
    atualizarPessoas()
  }

  async function executar(acao: () => Promise<void>) {
    if (ocupado || !podeTentarEscrever) return
    setOcupado(true)
    setErroAcao('')
    try {
      await acao()
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) expirar(token)
      else if (error instanceof ApiError && error.status === 403) {
        informarEscritaRecusada('Sem permissão para alterar registros desta pessoa. ' + mensagem(error))
      } else if (error instanceof ApiError && error.status === 404) {
        setFormulario(null)
        revalidar()
        atualizarPessoas()
        setErroAcao(mensagem(error))
      } else setErroAcao(mensagem(error))
    } finally {
      setOcupado(false)
    }
  }

  function abrirFormulario(registro: RegistroCuidado | null) {
    setErroAcao('')
    setFormulario({ registro })
  }

  const podeAbrirFormulario = Boolean(areas?.length && registros !== null)

  if (erroPermissao) return <p role="alert" className="text-sm text-brand-danger">{erroPermissao.message}</p>
  if (!acessoConfirmado) return <p role="status" className="text-sm text-brand-muted">Consultando permissão...</p>

  return (
    <div className="space-y-4">
      {erroAreas && <p role="alert" className="text-sm text-brand-danger">{erroAreas}</p>}
      {!somenteLeitura && !areas && !erroAreas && <p role="status" className="text-sm text-brand-muted">Carregando áreas de cuidado...</p>}
      {podeTentarEscrever && areas?.length === 0 && (
        <p role="status" className="text-sm text-brand-muted">
          Esta pessoa não tem áreas habilitadas. {perfil === 'familiar'
            ? 'Habilite uma área para criar um registro.'
            : 'Um familiar autorizado precisa habilitar uma área para que você possa criar registros.'}
        </p>
      )}
      {podeTentarEscrever && <div className="flex flex-wrap gap-2">
        <button type="button" disabled={!podeAbrirFormulario || ocupado} className={botao}
          onClick={() => abrirFormulario(null)}>Novo registro</button>
        {perfil === 'familiar' && (
          <button type="button" disabled={!areas || habilitandoArea} className={botao}
            onClick={() => setHabilitandoArea(true)}>Habilitar área</button>
        )}
      </div>}
      {podeTentarEscrever && perfil === 'familiar' && habilitandoArea && areas && (
        <HabilitarArea pessoaId={pessoaId} token={token} areas={areas}
          onAtualizar={setAreas} onFechar={() => setHabilitandoArea(false)} onSemPermissao={informarEscritaRecusada} />
      )}
      {erroAcao && <p role="alert" className="text-sm text-brand-danger">{erroAcao}</p>}
      {podeTentarEscrever && formulario && areas && (
        <FormularioRegistro key={formulario.registro?.id ?? 'novo'} areas={areas} registro={formulario.registro}
          ocupado={ocupado}
          onCancelar={() => { setFormulario(null); setErroAcao('') }}
          onSalvar={(dados) => void executar(async () => {
            const editando = formulario.registro
            const salvo = await salvarRegistroCuidado(pessoaId, dados, token, editando?.id)
            setRegistros((atuais) => editando
              ? (atuais ?? []).map((item) => item.id === salvo.id ? salvo : item)
              : [salvo, ...(atuais ?? [])])
            setFormulario(null)
          })} />
      )}
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      {!registros && !erro && <p role="status" className="text-sm text-brand-muted">Carregando registros...</p>}
      {registros?.length === 0 && <p role="status" className="text-sm text-brand-muted">Nenhum registro para esta pessoa.</p>}
      {registros && registros.length > 0 && (
        <ul className="space-y-3">
          {registros.map((registro) => {
            const data = registro.dataRealizado ?? registro.dataPrevista
            return (
              <li key={registro.id} className="rounded-2xl border border-brand-border bg-white p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="font-bold text-brand-ink">{registro.titulo}</h4>
                  <span className="rounded-full bg-brand-pink-light px-2.5 py-1 text-xs font-bold text-brand-primary">
                    {statusLabels[registro.status] ?? registro.status}
                  </span>
                </div>
                {registro.detalhe && <p className="mt-1 text-sm text-brand-muted">{registro.detalhe}</p>}
                {data && (
                  <time dateTime={data} className="mt-2 block text-xs text-brand-muted">
                    {new Date(data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}
                  </time>
                )}
                {podeTentarEscrever && <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" disabled={!podeAbrirFormulario || ocupado} className={botao}
                    onClick={() => abrirFormulario(registro)}>Editar</button>
                  <button type="button" disabled={ocupado} className={botao + ' text-brand-danger'}
                    onClick={() => {
                      if (!window.confirm('Excluir este registro de cuidado?')) return
                      void executar(async () => {
                        await excluirRegistroCuidado(registro.id, token)
                        setRegistros((atuais) => (atuais ?? []).filter(({ id }) => id !== registro.id))
                        if (formulario?.registro?.id === registro.id) setFormulario(null)
                      })
                    }}>Excluir</button>
                </div>}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default function RotinaCuidados({ token, perfil }: { token: string; perfil: PerfilRotina }) {
  const { pessoas, carregando, erro, atualizar } = usePessoasAcompanhadas(token, true)
  const [selecao, setSelecao] = useState('')
  const pessoa = pessoas.length === 1 ? pessoas[0] : pessoas.find(({ id }) => String(id) === selecao)

  return (
    <section className="space-y-4 rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
      <h3 className="font-bold text-brand-ink">Registros de cuidado</h3>
      {carregando && <p role="status" className="text-sm text-brand-muted">Carregando pessoas acompanhadas...</p>}
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      {!carregando && !erro && !pessoas.length && (
        <p role="status" className="text-sm text-brand-muted">
          {perfil === 'familiar' && 'Nenhuma pessoa acompanhada cadastrada.'}
          {perfil === 'cuidador' && 'Nenhuma pessoa acompanhada com vínculo ativo para esta conta. O acesso depende de provisionamento administrativo.'}
          {perfil === 'pessoa' && 'Sua conta ainda não está vinculada a uma pessoa acompanhada. Solicite o vínculo à administração.'}
        </p>
      )}
      {pessoas.length > 0 && (
        <label className="block text-sm font-bold text-brand-ink">
          Pessoa acompanhada
          <select
            value={pessoa?.id ?? ''}
            onChange={(event) => setSelecao(event.target.value)}
            className="mt-2 block w-full max-w-sm rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-normal"
          >
            {pessoas.length > 1 && <option value="">Selecione uma pessoa</option>}
            {pessoas.map(({ id, nome }) => <option key={id} value={id}>{nome}</option>)}
          </select>
        </label>
      )}
      {pessoa && <RegistrosDaPessoa key={pessoa.id} pessoaId={pessoa.id} token={token} perfil={perfil} atualizarPessoas={atualizar} />}
    </section>
  )
}
