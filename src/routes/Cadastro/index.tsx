
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Heart,
  LockKeyhole,
  Mail,
  Phone,
  UserRound,
} from 'lucide-react'

export default function Cadastro() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <main className="min-h-screen bg-brand-background lg:grid lg:grid-cols-2">
      <section className="relative hidden min-h-screen flex-col justify-between overflow-hidden bg-brand-dark p-12 text-white lg:flex xl:p-16">
        <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-3">
          <img src="/assets/img01-logo-cuidar.jpeg" alt="Cuidar+" className="h-12 w-12 rounded-xl object-cover" />
          <span className="text-2xl font-bold text-white">Cuidar<span className="text-brand-pink">+</span></span>
        </Link>

        <div className="relative z-10 max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80">
            <Heart size={16} className="text-brand-pink" />
            Cuidado que conecta
          </span>
          <h1 className="mt-8 text-4xl font-bold leading-tight text-white xl:text-5xl">
            Uma rede de apoio começa com pessoas conectadas.
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-white/70">
            Crie sua conta e dê o primeiro passo para organizar e compartilhar os cuidados de quem importa.
          </p>
        </div>

        <p className="relative z-10 text-sm text-white/60">Cuidar+ · Cuidado que conecta.</p>
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary">
            <ArrowLeft size={17} />
            Voltar para o início
          </Link>

          <div className="mb-8 lg:hidden">
            <img src="/assets/img01-logo-cuidar.jpeg" alt="Cuidar+" className="h-14 w-14 rounded-xl object-cover" />
          </div>

          <div>
            <span className="text-sm font-bold uppercase tracking-[0.16em] text-brand-pink">Crie sua conta</span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Faça parte do Cuidar+</h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Preencha seus dados para começar a organizar sua rede de cuidados.
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-bold">Nome completo</label>
              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4">
                <UserRound size={18} className="shrink-0 text-brand-muted" />
                <input id="name" type="text" value={name} onChange={(event) => setName(event.target.value)} placeholder="Digite seu nome completo" autoComplete="name" className="w-full bg-transparent py-4 text-sm outline-none" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold">E-mail</label>
              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4">
                <Mail size={18} className="shrink-0 text-brand-muted" />
                <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" autoComplete="email" className="w-full bg-transparent py-4 text-sm outline-none" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-bold">Telefone</label>
              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4">
                <Phone size={18} className="shrink-0 text-brand-muted" />
                <input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="(11) 99999-9999" autoComplete="tel" className="w-full bg-transparent py-4 text-sm outline-none" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold">Senha</label>
              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4">
                <LockKeyhole size={18} className="shrink-0 text-brand-muted" />
                <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Crie uma senha" autoComplete="new-password" className="w-full bg-transparent py-4 text-sm outline-none" />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold">Confirmar senha</label>
              <div className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4">
                <LockKeyhole size={18} className="shrink-0 text-brand-muted" />
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Digite sua senha novamente" autoComplete="new-password" className="w-full bg-transparent py-4 text-sm outline-none" />
              </div>
            </div>

            <button type="button" disabled className="w-full cursor-not-allowed rounded-full bg-brand-primary py-4 text-sm font-bold text-white opacity-70">
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
