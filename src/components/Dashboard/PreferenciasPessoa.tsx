import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useSession } from '../../auth/Session'
import { ApiError } from '../../services/api'
import { atualizarPreferenciasPessoa, consultarPessoaAcompanhada } from '../../services/pessoasAcompanhadas'
import { usePessoasAcompanhadas } from './usePessoasAcompanhadas'
import { usePermissaoPessoa } from './usePermissaoPessoa'

const campo = 'mt-1 block w-full rounded-xl border border-brand-border px-3 py-2 text-sm'

function Preferencias({ id, token, familiar }: { id: number; token: string; familiar: boolean }) {
  const { expirar } = useSession()
  const { permissao, erro: erroPermissao, revalidar } = usePermissaoPessoa(id, token)
  const acessoConfirmado = permissao !== null
  const controller = useRef<AbortController | null>(null)
  const [detalhes, setDetalhes] = useState<Awaited<ReturnType<typeof consultarPessoaAcompanhada>> | null>(null)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [salvando, setSalvando] = useState(false)
  const somenteLeitura = !familiar || permissao !== 'REGISTRAR'

  useEffect(() => {
    if (!acessoConfirmado) {
      setDetalhes(null)
      return
    }
    const atual = new AbortController()
    controller.current = atual
    consultarPessoaAcompanhada(id, token, atual.signal)
      .then((pessoa) => { if (!atual.signal.aborted) setDetalhes(pessoa) })
      .catch((error: Error) => {
        if (atual.signal.aborted) return
        if (error instanceof ApiError && error.status === 401) expirar(token)
        else setErro(error.message)
      })
    return () => atual.abort()
  }, [id, token, expirar, acessoConfirmado])

  async function salvar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const signal = controller.current?.signal
    if (!signal || signal.aborted || !detalhes || somenteLeitura || salvando) return
    setSalvando(true)
    setErro('')
    setAviso('')
    try {
      const { tamanhoFonte, altoContraste } = detalhes
      const atualizado = await atualizarPreferenciasPessoa(id, { tamanhoFonte, altoContraste }, token, signal)
      if (signal.aborted) return
      setDetalhes(atualizado)
      setAviso('Preferências salvas.')
    } catch (error) {
      if (signal.aborted) return
      if (error instanceof ApiError && error.status === 401) expirar(token)
      else {
        if (error instanceof ApiError && (error.status === 403 || error.status === 404)) revalidar()
        if (error instanceof ApiError && error.status === 404) setDetalhes(null)
        setErro(error instanceof Error ? error.message : 'Falha ao salvar as preferências.')
      }
    } finally {
      if (!signal.aborted) setSalvando(false)
    }
  }

  if (erroPermissao) return <p role="alert" className="text-sm text-brand-danger">{erroPermissao.message}</p>
  if (!acessoConfirmado) return <p role="status" className="text-sm">Consultando permissão...</p>

  return (
    <form onSubmit={salvar} className="space-y-3">
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      {aviso && <p role="status" className="text-sm text-brand-success">{aviso}</p>}
      {!detalhes && !erro && <p role="status" className="text-sm">Carregando preferências...</p>}
      {detalhes && (
        <>
          <fieldset disabled={somenteLeitura || salvando} className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm font-bold">Tamanho da fonte
              <input className={campo} type="number" min={12} max={32} required value={detalhes.tamanhoFonte}
                onChange={(event) => setDetalhes({ ...detalhes, tamanhoFonte: event.target.valueAsNumber })} />
            </label>
            <label className="text-sm font-bold">Alto contraste
              <select className={campo} value={detalhes.altoContraste}
                onChange={(event) => setDetalhes({ ...detalhes, altoContraste: event.target.value === 'S' ? 'S' : 'N' })}>
                <option value="N">Não</option>
                <option value="S">Sim</option>
              </select>
            </label>
          </fieldset>
          {!somenteLeitura && (
            <button type="submit" disabled={salvando} className="rounded-xl bg-brand-primary px-4 py-2 text-sm font-bold text-white">
              {salvando ? 'Salvando...' : 'Salvar preferências'}
            </button>
          )}
        </>
      )}
    </form>
  )
}

export default function PreferenciasPessoa({ token, familiar }: { token: string; familiar: boolean }) {
  const { pessoas, carregando, erro } = usePessoasAcompanhadas(token, true)
  const [selecao, setSelecao] = useState('')
  const pessoa = pessoas.length === 1 ? pessoas[0] : pessoas.find(({ id }) => String(id) === selecao)

  return (
    <div className="space-y-3">
      {carregando && <p role="status" className="text-sm">Carregando pessoas acompanhadas...</p>}
      {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}
      {!carregando && !erro && pessoas.length === 0 && <p className="text-sm">Nenhuma pessoa disponível para esta conta.</p>}
      {pessoas.length > 0 && (
        <label className="block text-sm font-bold">Pessoa acompanhada
          <select className={campo} value={pessoa?.id ?? ''} onChange={(event) => setSelecao(event.target.value)}>
            {pessoas.length > 1 && <option value="">Selecione uma pessoa</option>}
            {pessoas.map(({ id, nome }) => <option key={id} value={id}>{nome}</option>)}
          </select>
        </label>
      )}
      {pessoa && <Preferencias key={pessoa.id} id={pessoa.id} token={token} familiar={familiar} />}
    </div>
  )
}
