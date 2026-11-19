
import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { SessionStatus, useSession } from '../../auth/Session'
import { dashboards } from '../../services/auth'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Heart,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { state } = useLocation()
  const { entrar, sessao, carregando, erro, aviso } = useSession()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviando) return
    setFeedback('')

    const normalizedEmail = email.trim()

    if (!normalizedEmail || !password.trim()) {
      setFeedback('Preencha seu e-mail e sua senha.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setFeedback('Informe um endereço de e-mail válido.')
      return
    }

    setEnviando(true)
    try {
      await entrar(normalizedEmail, password)
    } catch (error) {
      setFeedback((error as Error).message)
    } finally {
      setEnviando(false)
    }
  }

  if (carregando || erro) return <SessionStatus />
  if (sessao) return <Navigate to={dashboards[sessao.conta.perfil]} replace />

  return (
    <main className="flex min-h-screen bg-brand-background lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <section className="relative hidden min-h-screen w-1/2 flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex lg:h-full lg:min-h-0 xl:p-16">
        <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-3">
          <img
            src="/assets/img01-logo-cuidar.jpeg"
            alt="Cuidar+"
            className="h-12 w-12 rounded-xl object-cover"
          />
          <span className="text-2xl font-bold text-white">
            Cuidar<span className="text-brand-pink">+</span>
          </span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
            <Heart size={16} className="text-brand-pink" />
            Cuidado que conecta
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-tight text-white xl:text-5xl">
            O cuidado acontece melhor quando todos podem participar.
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-white/70">
            Organize a rotina, acompanhe informações importantes e conecte
            pessoas em uma rede de cuidado que respeita a autonomia de cada um.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-white/60">
          <ShieldCheck size={18} className="text-brand-pink" />
          Mais organização, autonomia e conexão no cuidado.
        </div>

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen w-full items-center justify-center px-5 py-12 sm:px-8 lg:h-full lg:min-h-0 lg:w-1/2 lg:overflow-y-auto lg:py-8">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary"
          >
            <ArrowLeft size={17} />
            Voltar para o início
          </Link>

          <div className="mb-8 lg:hidden">
            <img
              src="/assets/img01-logo-cuidar.jpeg"
              alt="Cuidar+"
              className="h-14 w-14 rounded-xl object-cover"
            />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-brand-pink">
              Acesse sua conta
            </span>

            <h2 className="mt-3 text-3xl font-bold text-brand-dark sm:text-4xl">
              Bem-vindo de volta
            </h2>

            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Entre com seus dados para continuar acompanhando sua rotina de
              cuidados.
            </p>
          </div>

          {state?.contaCriada && (
            <p role="status" className="mt-4 text-sm text-brand-success">Conta criada. Entre com seu e-mail e sua senha.</p>
          )}
          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-brand-ink">
                E-mail
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4 transition focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10">
                <Mail size={18} className="shrink-0 text-brand-muted" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  className="w-full bg-transparent py-4 text-sm text-brand-ink outline-none placeholder:text-brand-muted/70"
                  required
                />
              </div>
            </div>

            <div>
             

              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4 transition focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10">
                <LockKeyhole size={18} className="shrink-0 text-brand-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full bg-transparent py-4 text-sm text-brand-ink outline-none placeholder:text-brand-muted/70"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-brand-muted transition hover:text-brand-primary"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {(feedback || aviso) && (
              <p
                role="alert"
                aria-live="polite"
                className="rounded-xl bg-red-50 px-4 py-3 text-sm leading-6 text-brand-danger"
              >
                {feedback || aviso}
              </p>
            )}

            <button
              type="submit"
              disabled={enviando}
              className="w-full rounded-full bg-brand-primary py-4 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-primary/20"
            >
              {enviando ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-brand-muted">
            Ainda não tem uma conta?{' '}
            <Link
              to="/cadastro"
              className="font-bold text-brand-primary transition hover:text-brand-pink"
            >
              Criar conta
            </Link>
          </p>

          <p className="mt-8 text-center text-xs leading-6 text-brand-muted">
            Cuidar+ · Cuidado que conecta.
          </p>
        </div>
      </section>
    </main>
  )
}
