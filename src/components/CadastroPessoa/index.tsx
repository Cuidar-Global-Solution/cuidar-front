import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Check, Plus, X } from 'lucide-react'
import { useSession } from '../../auth/Session'
import { ApiError } from '../../services/api'
import {
  cadastrarPessoaAcompanhada,
  type PessoaAcompanhada,
} from '../../services/pessoasAcompanhadas'

const formularioVazio = {
  nome: '',
  dataNascimento: '',
  observacao: '',
  tamanhoFonte: '16',
  altoContraste: 'N' as 'S' | 'N',
}

const campo = 'w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30'
const rotulo = 'mb-1.5 block text-xs font-bold text-brand-dark'

export default function CadastroPessoa({
  disabled,
  onCadastrada,
}: {
  disabled: boolean
  onCadastrada: (pessoa: PessoaAcompanhada) => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const { sessao, expirar } = useSession()
  const enviandoRef = useRef(false)
  const [aberto, setAberto] = useState(false)
  const [formulario, setFormulario] = useState(formularioVazio)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')
  const hoje = new Date()
  const dataMaxima = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`

  useEffect(() => {
    if (aberto) dialog.current?.showModal()
  }, [aberto])

  function fechar() {
    if (enviandoRef.current) return
    dialog.current?.close()
    setAberto(false)
  }

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviandoRef.current || !sessao) return
    setErro('')
    if (!formulario.nome.trim()) {
      setErro('Informe o nome da pessoa acompanhada.')
      return
    }

    enviandoRef.current = true
    setEnviando(true)
    try {
      const pessoa = await cadastrarPessoaAcompanhada({
        nome: formulario.nome.trim(),
        dataNascimento: formulario.dataNascimento,
        observacao: formulario.observacao.trim() || null,
        tamanhoFonte: Number(formulario.tamanhoFonte),
        altoContraste: formulario.altoContraste,
        usuarioId: null,
      }, sessao.token)
      onCadastrada(pessoa)
      setFormulario(formularioVazio)
      dialog.current?.close()
      setAberto(false)
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        expirar(sessao.token)
      } else {
        setErro(error instanceof Error ? error.message : 'Não foi possível cadastrar a pessoa.')
      }
    } finally {
      enviandoRef.current = false
      setEnviando(false)
    }
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setAberto(true)}
        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Plus size={16} /> Cadastrar pessoa
      </button>

      <dialog
        ref={dialog}
        aria-labelledby="cadastro-pessoa-titulo"
        onCancel={(event) => {
          event.preventDefault()
          fechar()
        }}
        className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-brand-border bg-brand-surface p-6 text-brand-ink shadow-xl backdrop:bg-brand-ink/50 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">Pessoa assistida</p>
            <h2 id="cadastro-pessoa-titulo" className="mt-1 font-heading text-xl font-bold text-brand-dark">Cadastrar pessoa</h2>
            <p className="mt-1 text-sm text-brand-muted">Preencha os dados da pessoa acompanhada.</p>
          </div>
          <button type="button" onClick={fechar} disabled={enviando} aria-label="Fechar formulário" className="rounded-lg p-2 text-brand-muted hover:bg-brand-background disabled:opacity-60">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={enviar} className="mt-6 space-y-4" aria-busy={enviando}>
          <fieldset disabled={enviando} className="space-y-4">
            <div>
              <label htmlFor="pessoa-nome" className={rotulo}>Nome *</label>
              <input id="pessoa-nome" autoFocus required maxLength={100} value={formulario.nome} onChange={(event) => setFormulario({ ...formulario, nome: event.target.value })} className={campo} />
            </div>
            <div>
              <label htmlFor="pessoa-nascimento" className={rotulo}>Data de nascimento *</label>
              <input id="pessoa-nascimento" type="date" required max={dataMaxima} value={formulario.dataNascimento} onChange={(event) => setFormulario({ ...formulario, dataNascimento: event.target.value })} className={campo} />
            </div>
            <div>
              <label htmlFor="pessoa-observacao" className={rotulo}>Observação (opcional)</label>
              <textarea id="pessoa-observacao" rows={3} maxLength={300} value={formulario.observacao} onChange={(event) => setFormulario({ ...formulario, observacao: event.target.value })} className={campo} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pessoa-fonte" className={rotulo}>Tamanho da fonte *</label>
                <input id="pessoa-fonte" type="number" required min={12} max={32} step={1} value={formulario.tamanhoFonte} onChange={(event) => setFormulario({ ...formulario, tamanhoFonte: event.target.value })} className={campo} />
              </div>
              <div>
                <label htmlFor="pessoa-contraste" className={rotulo}>Alto contraste *</label>
                <select id="pessoa-contraste" required value={formulario.altoContraste} onChange={(event) => setFormulario({ ...formulario, altoContraste: event.target.value as 'S' | 'N' })} className={campo}>
                  <option value="N">Não</option>
                  <option value="S">Sim</option>
                </select>
              </div>
            </div>
          </fieldset>
          {erro && <p role="alert" className="whitespace-pre-line text-sm text-brand-danger">{erro}</p>}
          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={fechar} disabled={enviando} className="rounded-xl border border-brand-border px-5 py-3 text-sm font-bold text-brand-muted hover:bg-brand-background disabled:opacity-60">Cancelar</button>
            <button type="submit" disabled={enviando} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60">
              <Check size={17} /> {enviando ? 'Cadastrando...' : 'Cadastrar pessoa'}
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}
