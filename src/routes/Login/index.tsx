
import { Link } from 'react-router-dom'
import { LockKeyhole, Mail } from 'lucide-react'

export default function Login() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-background px-5 py-12">
      <section className="w-full max-w-md rounded-3xl border border-brand-border bg-white p-8 shadow-sm sm:p-10">
        <div className="mb-8 text-center">
          <img
            src="/assets/img01-logo-cuidar.jpeg"
            alt="Cuidar+"
            className="mx-auto h-16 w-16 rounded-2xl object-cover"
          />

          <h1 className="mt-6 text-3xl font-bold">
            Bem-vindo de volta
          </h1>

          <p className="mt-3 text-sm leading-6 text-brand-muted">
            Entre na sua conta para continuar acompanhando os cuidados.
          </p>
        </div>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold">
              E-mail
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-brand-border px-4">
              <Mail size={18} className="text-brand-muted" />
              <input
                id="email"
                type="email"
                placeholder="seuemail@exemplo.com"
                className="w-full bg-transparent py-4 text-sm outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-bold">
              Senha
            </label>

            <div className="flex items-center gap-3 rounded-xl border border-brand-border px-4">
              <LockKeyhole size={18} className="text-brand-muted" />
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                className="w-full bg-transparent py-4 text-sm outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-brand-primary py-4 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Entrar
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-brand-muted">
          Ainda não tem uma conta?{' '}
          <Link to="/cadastro" className="font-bold text-brand-primary">
            Criar conta
          </Link>
        </p>
      </section>
    </main>
  )
}