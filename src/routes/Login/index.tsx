
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
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
  const [hasError, setHasError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFeedback('')
    setHasError(false)

    if (!email.trim() || !password.trim()) {
      setFeedback('Preencha seu e-mail e sua senha.')
      setHasError(true)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setFeedback('Informe um endereço de e-mail válido.')
      setHasError(true)
      return
    }

    setFeedback(
      'Seus dados foram preenchidos corretamente. O acesso será habilitado após a integração com a API.'
    )
  }

  return (
    <main className="flex min-h-screen bg-brand-background">
      <section className="hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex xl:p-16">
        <Link to="/" className="inline-flex w-fit items-center gap-3">
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
            Cuidar de quem importa começa com uma rede de apoio.
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-white/70">
            Organize informações, acompanhe a rotina e mantenha as pessoas
            envolvidas no cuidado mais próximas.
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/60">
          <ShieldCheck size={18} className="text-brand-pink" />
          Uma proposta pensada para aproximar pessoas e organizar o cuidado.
        </div>

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen w-full items-center justify-center px-5 py-12 sm:px-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary"
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

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Bem-vindo de volta
            </h2>

            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Entre com seus dados para continuar acompanhando a rotina de cuidados.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-9 space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold">
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
                  className="w-full bg-transparent py-4 text-sm outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="password" className="text-sm font-bold">
                  Senha
                </label>

                <Link
                  to="/recuperar-senha"
                  className="text-xs font-bold text-brand-primary transition hover:text-brand-pink sm:text-sm"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4 transition focus-within:border-brand-primary focus-within:ring-2 focus-within:ring-brand-primary/10">
                <LockKeyhole size={18} className="shrink-0 text-brand-muted" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full bg-transparent py-4 text-sm outline-none"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-brand-muted transition hover:text-brand-primary"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {feedback && (
              <p
                role="alert"
                className={`rounded-xl px-4 py-3 text-sm leading-6 ${
                  hasError
                    ? 'bg-red-50 text-brand-danger'
                    : 'bg-brand-pink-light text-brand-primary'
                }`}
              >
                {feedback}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-brand-primary py-4 text-sm font-bold text-white shadow-sm transition hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-primary/20"
            >
              Entrar
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-brand-muted">
            Ainda não tem uma conta?{' '}
            <Link
              to="/cadastro"
              className="font-bold text-brand-primary transition hover:text-brand-pink"
            >
              Criar conta
            </Link>
          </p>

          <p className="mt-10 text-center text-xs leading-6 text-brand-muted">
            Cuidar+ · Cuidado que conecta.
          </p>
        </div>
      </section>
    </main>
  )
}