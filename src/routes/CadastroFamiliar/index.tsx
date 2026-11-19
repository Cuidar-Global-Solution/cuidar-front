
import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrarConta } from '../../services/auth'

type FormErrors = {
  nome?: string
  email?: string
  telefone?: string
  senha?: string
  confirmarSenha?: string
}

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11)

  if (digits.length <= 2) return digits ? `(${digits}` : ''
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export default function CadastroFamiliar() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})

  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviando) return
    setErro('')

    const newErrors: FormErrors = {}

    if (nome.trim().length < 3) {
      newErrors.nome = 'Informe seu nome completo.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = 'Informe um e-mail válido.'
    }

    if (telefone && telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Informe um telefone válido.'
    }

    if (senha.length < 8) {
      newErrors.senha = 'A senha deve ter pelo menos 8 caracteres.'
    }

    if (confirmarSenha !== senha || !confirmarSenha) {
      newErrors.confirmarSenha = 'As senhas precisam ser iguais.'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    setEnviando(true)
    try {
      await cadastrarConta({ nome: nome.trim(), email: email.trim(), senha, perfil: 'FAMILIAR' })
      navigate('/login', { replace: true, state: { contaCriada: true } })
    } catch (error) {
      setErro((error as Error).message)
    } finally {
      setEnviando(false)
    }
  }

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border bg-white py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-brand-muted/70 focus:ring-4 focus:ring-brand-primary/10 ${
      hasError
        ? 'border-brand-danger focus:border-brand-danger'
        : 'border-brand-border focus:border-brand-primary'
    }`

  return (
    <main className="flex min-h-screen bg-brand-background">
      <section className="relative hidden min-h-screen w-1/2 flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:sticky lg:top-0 lg:flex lg:h-screen xl:p-16">
        <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
          <img
            src="/assets/img01-logo-cuidar.jpeg"
            alt="Cuidar+"
            className="h-12 w-12 rounded-xl object-cover"
          />
          <span className="text-2xl font-bold">
            Cuidar<span className="text-brand-pink">+</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
            <Heart size={16} className="text-brand-pink" />
            Para famílias
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-tight text-white xl:text-5xl">
            Cuidar em conjunto faz toda a diferença.
          </h1>

          <p className="mt-6 text-base leading-8 text-white/70">
            Organize informações, acompanhe a rotina e compartilhe os cuidados com quem faz parte dessa rede de apoio.
          </p>
        </div>

        <p className="relative z-10 text-sm text-white/60">
          Uma rotina mais organizada começa com o primeiro passo.
        </p>

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen w-full items-start justify-center px-4 py-8 sm:px-8 sm:py-10 lg:min-h-screen lg:w-1/2 lg:px-12 lg:py-12">
        <div className="w-full max-w-md">
          <Link
            to="/cadastro"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 sm:mb-8"
          >
            <ArrowLeft size={17} />
            Voltar à escolha de perfil
          </Link>

          <div className="mb-7 lg:hidden">
            <img
              src="/assets/img01-logo-cuidar.jpeg"
              alt="Cuidar+"
              className="h-12 w-12 rounded-xl object-cover sm:h-14 sm:w-14"
            />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink sm:text-sm">
              Cadastro de familiar
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              Crie sua conta
            </h2>

            <p className="mt-3 text-sm leading-6 text-brand-muted sm:leading-7">
              Preencha seus dados para começar a organizar os cuidados com o Cuidar+.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4 sm:mt-8 sm:space-y-5">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-brand-ink">
                Nome completo
              </label>
              <div className="relative">
                <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  value={nome}
                  onChange={(event) => {
                    setNome(event.target.value)
                    setErro('')
                  }}
                  placeholder="Digite seu nome completo"
                  aria-invalid={!!errors.nome}
                  className={inputClass(!!errors.nome)}
                />
              </div>
              {errors.nome && <p className="mt-1.5 text-xs text-brand-danger">{errors.nome}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-ink">
                E-mail
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value)
                    setErro('')
                  }}
                  placeholder="seuemail@exemplo.com"
                  aria-invalid={!!errors.email}
                  className={inputClass(!!errors.email)}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-brand-danger">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="telefone" className="mb-2 block text-sm font-semibold text-brand-ink">
                Telefone (opcional)
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  value={telefone}
                  onChange={(event) => {
                    setTelefone(formatPhone(event.target.value))
                    setErro('')
                  }}
                  placeholder="(00) 00000-0000"
                  aria-invalid={!!errors.telefone}
                  className={inputClass(!!errors.telefone)}
                />
              </div>
              {errors.telefone && <p className="mt-1.5 text-xs text-brand-danger">{errors.telefone}</p>}
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-sm font-semibold text-brand-ink">
                Senha
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={senha}
                  onChange={(event) => {
                    setSenha(event.target.value)
                    setErro('')
                  }}
                  placeholder="Crie uma senha"
                  aria-invalid={!!errors.senha}
                  className={inputClass(!!errors.senha)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted transition hover:text-brand-primary"
                >
                  {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.senha && <p className="mt-1.5 text-xs text-brand-danger">{errors.senha}</p>}
              <p className="mt-1.5 text-xs text-brand-muted">
                Utilize pelo menos 8 caracteres.
              </p>
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="mb-2 block text-sm font-semibold text-brand-ink">
                Confirmar senha
              </label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={mostrarConfirmacao ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={confirmarSenha}
                  onChange={(event) => {
                    setConfirmarSenha(event.target.value)
                    setErro('')
                  }}
                  placeholder="Digite sua senha novamente"
                  aria-invalid={!!errors.confirmarSenha}
                  className={inputClass(!!errors.confirmarSenha)}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                  aria-label={mostrarConfirmacao ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted transition hover:text-brand-primary"
                >
                  {mostrarConfirmacao ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmarSenha && <p className="mt-1.5 text-xs text-brand-danger">{errors.confirmarSenha}</p>}
            </div>

            <p className="text-xs text-brand-muted">O cadastro da conta salva nome, e-mail e perfil. O telefone não é enviado.</p>
            {erro && <p role="alert" className="text-sm text-brand-danger">{erro}</p>}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
            >
              {enviando ? 'Criando conta...' : 'Criar conta'}
            </button>
          </form>

          <p className="mt-7 pb-2 text-center text-sm text-brand-muted sm:mt-8">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-bold text-brand-primary transition hover:text-brand-pink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
            >
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
