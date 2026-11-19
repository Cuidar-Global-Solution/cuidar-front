
import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { cadastrarConta } from '../../services/auth'
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Heart,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

export default function CadastroPessoa() {

  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  })

  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false)
  const [erro, setErro] = useState('')

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setErro('')
  }

  const [enviando, setEnviando] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (enviando) return
    setErro('')

    if (form.senha.length < 8) {
      setErro('A senha deve ter pelo menos 8 caracteres.')
      return
    }

    if (form.senha !== form.confirmarSenha) {
      setErro('As senhas informadas não coincidem.')
      return
    }

    setEnviando(true)
    try {
      await cadastrarConta({ nome: form.nome.trim(), email: form.email.trim(), senha: form.senha, perfil: 'ACOMPANHADO' })
      navigate('/login', { replace: true, state: { contaCriada: true } })
    } catch (error) {
      setErro((error as Error).message)
    } finally {
      setEnviando(false)
    }
  }

  return (
    <main className="flex min-h-screen bg-brand-background lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <section className="relative hidden min-h-screen w-1/2 flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex lg:h-full lg:min-h-0 xl:p-16">
        <Link
          to="/"
          className="relative z-10 inline-flex w-fit items-center gap-3"
        >
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
            Sua autonomia importa
          </span>

          <h1 className="mt-8 text-4xl font-bold leading-tight text-white xl:text-5xl">
            Você também faz parte das decisões sobre o seu cuidado.
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-white/70">
            Organize sua rotina, acompanhe seus registros e compartilhe
            informações com pessoas em quem confia.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-white/60">
          <ShieldCheck size={18} className="text-brand-pink" />
          Seus cuidados, suas escolhas e suas permissões.
        </div>

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-8 sm:py-10 lg:h-full lg:min-h-0 lg:w-1/2 lg:overflow-y-auto lg:px-10 lg:py-8 xl:px-16">
        <div className="w-full max-w-lg">
          <Link
            to="/cadastro"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 sm:mb-8"
          >
            <ArrowLeft size={17} />
            Voltar para os perfis
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
              Cadastro pessoal
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              Crie sua conta no Cuidar+
            </h2>

            <p className="mt-3 text-sm leading-6 text-brand-muted sm:mt-4 sm:leading-7">
              Preencha seus dados para começar a organizar e acompanhar sua
              rotina de cuidados.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5 sm:mt-8">
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm font-bold text-brand-ink"
              >
                Nome completo
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
                <UserRound size={19} className="shrink-0 text-brand-muted" />
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  required
                  value={form.nome}
                  onChange={handleChange}
                  placeholder="Digite seu nome completo"
                  className="h-12 w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-brand-ink"
              >
                E-mail
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="seuemail@exemplo.com"
                className="h-12 w-full rounded-xl border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
              />
            </div>

            <div>
              <label
                htmlFor="senha"
                className="mb-2 block text-sm font-bold text-brand-ink"
              >
                Senha
              </label>

              <div className="flex items-center rounded-xl border border-brand-border bg-white px-4 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={form.senha}
                  onChange={handleChange}
                  placeholder="Crie uma senha com pelo menos 8 caracteres"
                  className="h-12 w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((current) => !current)}
                  className="ml-2 shrink-0 text-brand-muted transition hover:text-brand-primary"
                  aria-label={mostrarSenha ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmarSenha"
                className="mb-2 block text-sm font-bold text-brand-ink"
              >
                Confirmar senha
              </label>

              <div className="flex items-center rounded-xl border border-brand-border bg-white px-4 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
                <input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type={mostrarConfirmacao ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={form.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Digite sua senha novamente"
                  className="h-12 w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted"
                />
                <button
                  type="button"
                  onClick={() =>
                    setMostrarConfirmacao((current) => !current)
                  }
                  className="ml-2 shrink-0 text-brand-muted transition hover:text-brand-primary"
                  aria-label={
                    mostrarConfirmacao
                      ? 'Ocultar confirmação da senha'
                      : 'Mostrar confirmação da senha'
                  }
                >
                  {mostrarConfirmacao ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {erro && (
              <div
                role="alert"
                className="rounded-xl border border-brand-danger/20 bg-brand-danger/5 px-4 py-3 text-sm leading-6 text-brand-danger"
              >
                {erro}
              </div>
            )}

            <div className="rounded-xl border border-brand-border bg-white/70 px-4 py-3">
              <p className="text-xs leading-5 text-brand-muted">
                Você poderá adicionar familiares e profissionais à sua rede
                de apoio posteriormente, escolhendo quais informações deseja
                compartilhar com cada pessoa.
              </p>
            </div>

            <button
              type="submit"
              disabled={enviando}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 text-sm font-bold text-white transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20"
            >
              {enviando ? 'Criando conta...' : 'Criar minha conta'}
              <ArrowRight size={17} />
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-brand-muted sm:mt-8">
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
