
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  HeartHandshake,
  ShieldCheck,
  UsersRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Cadastro() {
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
            Cada pessoa tem um papel importante no cuidado.
          </h1>

          <p className="mt-6 max-w-md text-base leading-8 text-white/70">
            O Cuidar+ aproxima famílias e profissionais para tornar a rotina de cuidados mais organizada e colaborativa.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-white/60">
          <ShieldCheck size={18} className="text-brand-pink" />
          Uma rede de apoio construída com confiança e respeito.
        </div>

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:h-full lg:min-h-0 lg:w-1/2 lg:overflow-y-auto lg:py-8">
        <div className="w-full max-w-lg">
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
              Criar conta
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Como você quer fazer parte do Cuidar+?
            </h2>

            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Escolha o tipo de conta que melhor representa sua participação na rede de cuidados.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Link
              to="/cadastro/familiar"
              className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-5 transition hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5 sm:p-6"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                <UsersRound size={26} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-brand-ink">
                  Sou familiar
                </h3>

                <p className="mt-1 text-sm leading-6 text-brand-muted">
                  Quero organizar os cuidados de um familiar e acompanhar sua rotina.
                </p>

                <ul className="mt-3 space-y-1.5 text-sm text-brand-muted">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                    Organizar tarefas e compromissos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                    Compartilhar informações do cuidado
                  </li>
                </ul>
              </div>

              <ArrowRight
                size={20}
                className="mt-1 shrink-0 text-brand-muted transition group-hover:translate-x-1 group-hover:text-brand-primary"
              />
            </Link>

            <Link
              to="/cadastro/cuidador"
              className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-white p-5 transition hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5 sm:p-6"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F3E8FF] text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white">
                <HeartHandshake size={26} />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-brand-ink">
                  Sou cuidador
                </h3>

                <p className="mt-1 text-sm leading-6 text-brand-muted">
                  Quero apresentar minha experiência e me conectar com famílias.
                </p>

                <ul className="mt-3 space-y-1.5 text-sm text-brand-muted">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                    Criar um perfil profissional
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-pink" />
                    Apresentar experiência e formação
                  </li>
                </ul>
              </div>

              <ArrowRight
                size={20}
                className="mt-1 shrink-0 text-brand-muted transition group-hover:translate-x-1 group-hover:text-brand-primary"
              />
            </Link>
          </div>

          <div className="mt-6 rounded-xl border border-brand-border bg-white/70 px-4 py-3">
            <p className="text-xs leading-5 text-brand-muted">
              Cada perfil possui recursos próprios, pensados para as diferentes necessidades de quem participa da rede de cuidados.
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-brand-muted">
            Já tem uma conta?{' '}
            <Link
              to="/login"
              className="font-bold text-brand-primary transition hover:text-brand-pink"
            >
              Entrar
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
