import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSession } from '../../auth/Session'
import { ApiError } from '../../services/api'
import type { PermissaoCuidado } from '../../services/pessoasAcompanhadas'
import {
  aceitarConvite, convidarProfissional, listarVinculos, mudarPermissaoProfissional,
  revogarVinculoProfissional, type VinculoProfissional,
} from '../../services/vinculosProfissionais'
import { usePermissaoPessoa } from './usePermissaoPessoa'
import { usePessoasAcompanhadas } from './usePessoasAcompanhadas'

const campo = 'mt-1 block w-full rounded-xl border border-brand-border bg-white px-3 py-2 text-sm'
const botao = 'rounded-xl border border-brand-border px-3 py-2 text-sm font-bold disabled:opacity-50'

function OpcoesPermissao() {
  return <><option value="VISUALIZAR">VISUALIZAR · Somente leitura</option><option value="REGISTRAR">REGISTRAR · Leitura e escrita</option></>
}

function ListaVinculos({ token, pessoaId, revalidar }: {
  token: string
  pessoaId?: number
  revalidar?: () => void
}) {
  const { expirar } = useSession()
  const [lista, setLista] = useState<VinculoProfissional[] | null>(null)
  const [erro, setErro] = useState('')
  const [erroAcao, setErroAcao] = useState('')
  const [ocupado, setOcupado] = useState(false)
  const [email, setEmail] = useState('')
  const [permissao, setPermissao] = useState<PermissaoCuidado>('VISUALIZAR')
  const controller = useRef<AbortController | null>(null)
  const bloqueio = useRef(false)
  const versao = useRef(0)

  useEffect(() => {
    const atual = new AbortController()
    controller.current = atual
    let consultando = false
    async function carregar() {
      if (bloqueio.current || consultando) return
      consultando = true
      const consulta = versao.current
      try {
        const vinculos = await listarVinculos(token, atual.signal, pessoaId)
        if (atual.signal.aborted || bloqueio.current || consulta !== versao.current) return
        setLista(vinculos)
        setErro('')
      } catch (falha) {
        if (atual.signal.aborted || bloqueio.current || consulta !== versao.current) return
        setLista(null)
        if (falha instanceof ApiError && falha.status === 401) expirar(token)
        else setErro(falha instanceof Error ? falha.message : 'Falha ao consultar vínculos.')
      } finally {
        consultando = false
      }
    }
    void carregar()
    const intervalo = window.setInterval(carregar, 5000)
    window.addEventListener('focus', carregar)
    return () => {
      atual.abort()
      window.clearInterval(intervalo)
      window.removeEventListener('focus', carregar)
    }
  }, [token, pessoaId, expirar])

  async function executar(acao: (signal: AbortSignal) => Promise<void>) {
    const signal = controller.current?.signal
    if (!signal || signal.aborted || bloqueio.current) return
    bloqueio.current = true
    versao.current += 1
    setOcupado(true)
    setErroAcao('')
    try {
      try {
        await acao(signal)
      } catch (falha) {
        if (signal.aborted) return
        if (falha instanceof ApiError && falha.status === 401) {
          expirar(token)
          return
        }
        setErroAcao(falha instanceof Error ? falha.message : 'Falha na operação de vínculo.')
        if (!(falha instanceof ApiError) || ![403, 404, 409].includes(falha.status)) return
        if (falha.status === 403) revalidar?.()
      }
      const vinculos = await listarVinculos(token, signal, pessoaId)
      if (!signal.aborted) {
        setLista(vinculos)
        setErro('')
      }
    } catch (falha) {
      if (signal.aborted) return
      setLista(null)
      if (falha instanceof ApiError && falha.status === 401) expirar(token)
      else setErro(falha instanceof Error ? falha.message : 'Falha ao atualizar os vínculos.')
    } finally {
      bloqueio.current = false
      if (!signal.aborted) setOcupado(false)
    }
  }

  function convidar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pessoaId === undefined || !email.trim()) return
    void executar(async (signal) => {
      await convidarProfissional(pessoaId, email.trim(), permissao, token, signal)
      if (!signal.aborted) setEmail('')
    })
  }

  return (
    <div className="space-y-4">
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      {erroAcao && <p role="alert" className="text-sm text-brand-danger">{erroAcao}</p>}
      {!lista && !erro && <p role="status" className="text-sm text-brand-muted">Carregando vínculos...</p>}
      {pessoaId !== undefined && lista && (
        <form onSubmit={convidar} className="space-y-3 rounded-2xl border border-brand-border p-4">
          <h3 className="font-bold">Convidar profissional</h3>
          <fieldset disabled={ocupado} className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-bold">E-mail do profissional
              <input type="email" required maxLength={120} value={email} className={campo}
                onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label className="text-sm font-bold">Permissão do convite
              <select className={campo} value={permissao} onChange={(event) => setPermissao(event.target.value as PermissaoCuidado)}>
                <OpcoesPermissao />
              </select>
            </label>
          </fieldset>
          <button type="submit" disabled={ocupado} className={botao + ' bg-brand-primary text-white'}>Enviar convite</button>
        </form>
      )}
      {lista?.length === 0 && <p role="status" className="text-sm text-brand-muted">Nenhum vínculo ou convite encontrado.</p>}
      {lista && lista.length > 0 && (
        <ul className="space-y-3">
          {lista.map((vinculo) => (
            <li key={vinculo.id} className="space-y-3 rounded-2xl border border-brand-border p-4">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-bold">{pessoaId === undefined
                  ? 'Pessoa acompanhada #' + vinculo.pessoaAcompanhadaId
                  : vinculo.nomeProfissional}</h3>
                <span className="rounded-full bg-brand-pink-light px-2 py-1 text-xs font-bold text-brand-primary">{vinculo.autorizacao}</span>
                <span className="text-sm text-brand-muted">{vinculo.permissao}</span>
              </div>
              {pessoaId !== undefined && vinculo.autorizacao !== 'REVOGADO' && (
                <div className="flex flex-wrap items-end gap-3">
                  <label className="text-sm font-bold">Alterar permissão de {vinculo.nomeProfissional}
                    <select className={campo} value={vinculo.permissao} disabled={ocupado}
                      onChange={(event) => {
                        const permissaoNova = event.target.value as PermissaoCuidado
                        void executar((signal) => mudarPermissaoProfissional(pessoaId, vinculo.id, permissaoNova, token, signal))
                      }}>
                      <OpcoesPermissao />
                    </select>
                  </label>
                  <button type="button" disabled={ocupado} className={botao + ' text-brand-danger'} onClick={() => {
                    if (window.confirm('Revogar este vínculo profissional?')) {
                      void executar((signal) => revogarVinculoProfissional(pessoaId, vinculo.id, token, signal))
                    }
                  }}>Revogar vínculo</button>
                </div>
              )}
              {pessoaId === undefined && vinculo.autorizacao === 'PENDENTE' && (
                <button type="button" disabled={ocupado} className={botao + ' bg-brand-primary text-white'}
                  onClick={() => void executar((signal) => aceitarConvite(vinculo.id, token, signal))}>Aceitar convite</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function VinculosDaPessoa({ id, token }: { id: number; token: string }) {
  const { permissao, erro, revalidar } = usePermissaoPessoa(id, token)
  if (erro) return <p role="alert" className="text-sm text-brand-danger">{erro.message}</p>
  if (!permissao) return <p role="status" className="text-sm text-brand-muted">Consultando permissão...</p>
  if (permissao === 'VISUALIZAR') {
    return <p className="text-sm text-brand-muted">Este vínculo permite somente leitura. A gestão de convites exige permissão para registrar.</p>
  }
  return <ListaVinculos pessoaId={id} token={token} revalidar={revalidar} />
}

function RedeFamiliar({ token }: { token: string }) {
  const { pessoas, carregando, erro } = usePessoasAcompanhadas(token, true)
  const [selecao, setSelecao] = useState('')
  const pessoa = pessoas.length === 1 ? pessoas[0] : pessoas.find(({ id }) => String(id) === selecao)

  return (
    <div className="space-y-4">
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      {carregando && <p role="status" className="text-sm text-brand-muted">Carregando pessoas acompanhadas...</p>}
      {!carregando && !erro && pessoas.length === 0 && <p className="text-sm text-brand-muted">Nenhuma pessoa acompanhada cadastrada.</p>}
      {pessoas.length > 0 && (
        <label className="block max-w-sm text-sm font-bold">Pessoa acompanhada
          <select className={campo} value={pessoa?.id ?? ''} onChange={(event) => setSelecao(event.target.value)}>
            {pessoas.length > 1 && <option value="">Selecione uma pessoa</option>}
            {pessoas.map(({ id, nome }) => <option key={id} value={id}>{nome}</option>)}
          </select>
        </label>
      )}
      {pessoa && <VinculosDaPessoa key={pessoa.id} id={pessoa.id} token={token} />}
    </div>
  )
}

export default function RedeApoio({ token, perfil }: { token: string; perfil: 'familiar' | 'cuidador' | 'pessoa' }) {
  return (
    <section className="space-y-4 rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
      {perfil === 'familiar' && <RedeFamiliar token={token} />}
      {perfil === 'cuidador' && <ListaVinculos token={token} />}
      {perfil === 'pessoa' && <p className="text-sm text-brand-muted">A gestão de vínculos profissionais está disponível ao familiar autorizado.</p>}
    </section>
  )
}
