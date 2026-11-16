
import { useState } from 'react'
import {
  ArrowLeft,
  Heart,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CadastroFamiliar() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')

  return (
    <main className="flex min-h-screen bg-brand-background lg:h-dvh lg:min-h-0 lg:overflow-hidden">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex xl:p-16">
        <Link to="/" className="relative z-10 flex w-fit items-center gap-3">
          <img src="/assets/img01-logo-cuidar.jpeg" alt="Cuidar+" className="h-12 w-12 rounded-xl object-cover" />
          <span className="text-2xl font-bold">Cuidar<span className="text-brand-pink">+</span></span>
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

      <section className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:h-full lg:w-1/2 lg:overflow-y-auto lg:px-12 lg:py-8">
        <div className="w-full max-w-md">
          <Link to="/cadastro" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary">
            <ArrowLeft size={17} />
            Voltar à escolha de perfil
          </Link>

          <div className="mb-8 lg:hidden">
            <img src="/assets/img01-logo-cuidar.jpeg" alt="Cuidar+" className="h-12 w-12 rounded-xl object-cover" />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-brand-pink">
              Cadastro de familiar
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Crie sua conta</h2>
            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Preencha seus dados para começar a organizar os cuidados com o Cuidar+.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-brand-ink">Nome completo</label>
              <div className="relative">
                <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="nome" name="nome" type="text" value={nome} onChange={(event) => setNome(event.target.value)} placeholder="Digite seu nome completo" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-brand-ink">E-mail</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="telefone" className="mb-2 block text-sm font-semibold text-brand-ink">Telefone</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="telefone" name="telefone" type="tel" value={telefone} onChange={(event) => setTelefone(event.target.value)} placeholder="(00) 00000-0000" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="senha" className="mb-2 block text-sm font-semibold text-brand-ink">Senha</label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="senha" name="senha" type="password" value={senha} onChange={(event) => setSenha(event.target.value)} placeholder="Crie uma senha" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="mb-2 block text-sm font-semibold text-brand-ink">Confirmar senha</label>
              <div className="relative">
                <LockKeyhole size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input id="confirmarSenha" name="confirmarSenha" type="password" value={confirmarSenha} onChange={(event) => setConfirmarSenha(event.target.value)} placeholder="Digite sua senha novamente" className="w-full rounded-xl border border-brand-border bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10" />
              </div>
            </div>

            <button type="submit" className="w-full rounded-xl bg-brand-primary px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark">
              Criar conta
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-brand-muted">
            Já tem uma conta? <Link to="/login" className="font-bold text-brand-primary transition hover:text-brand-pink">Entrar</Link>
          </p>
        </div>
      </section>
    </main>
  )
}
