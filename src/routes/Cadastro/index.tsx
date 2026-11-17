
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  HeartHandshake,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const cardClass =
  'group flex items-start gap-3 rounded-2xl border border-brand-border bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-lg hover:shadow-brand-primary/5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 motion-reduce:transform-none motion-reduce:transition-none sm:gap-4 sm:p-6'

const profiles = [
  {
    label: 'Para quem recebe cuidados',
    title: 'Sou a pessoa acompanhada',
    description:
      'Quero participar da organização da minha rotina e acompanhar meus próprios cuidados.',
    benefits: [
      'Acompanhar minha rotina de cuidados',
      'Compartilhar informações com pessoas de confiança',
    ],
    action: 'Continuar como pessoa acompanhada',
    to: '/cadastro/pessoa',
    icon: UserRound,
  },
  {
    label: 'Para famílias',
    title: 'Sou familiar',
    description:
      'Quero organizar os cuidados de um familiar e acompanhar sua rotina.',
    benefits: [
      'Organizar tarefas e compromissos',
      'Compartilhar informações do cuidado',
    ],
    action: 'Continuar como familiar',
    to: '/cadastro/familiar',
    icon: UsersRound,
  },
  {
    label: 'Para profissionais',
    title: 'Sou cuidador',
    description:
      'Quero apresentar minha experiência e me conectar com pessoas e famílias.',
    benefits: [
      'Criar um perfil profissional',
      'Apresentar experiência e formação',
    ],
    action: 'Continuar como cuidador',
    to: '/cadastro/cuidador',
    icon: HeartHandshake,
  },
]

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
            O Cuidar+ aproxima pessoas acompanhadas, famílias e profissionais
            para tornar a rotina de cuidados mais organizada e colaborativa.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-white/60">
          <ShieldCheck size={18} className="text-brand-pink" />
          Uma rede de apoio construída com confiança e respeito.
        </div>

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full border border-white/10" />
      </section>

      <section className="flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-8 sm:py-10 lg:h-full lg:min-h-0 lg:w-1/2 lg:overflow-y-auto lg:px-10 lg:py-8 xl:px-16">
        <div className="w-full max-w-lg">
          <Link
            to="/"
            className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/20 sm:mb-8"
          >
            <ArrowLeft size={17} />
            Voltar para o início
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
              Criar conta
            </span>

            <h2 className="mt-3 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              Como você quer fazer parte do Cuidar+?
            </h2>

            <p className="mt-3 text-sm leading-6 text-brand-muted sm:mt-4 sm:leading-7">
              Escolha o tipo de conta que melhor representa sua participação
              na rede de cuidados.
            </p>
          </div>

          <div className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
            {profiles.map((profile) => {
              const Icon = profile.icon

              return (
                <Link
                  key={profile.to}
                  to={profile.to}
                  className={cardClass}
                  aria-label={profile.action}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary transition group-hover:bg-brand-primary group-hover:text-white sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-brand-pink sm:text-xs">
                      {profile.label}
                    </span>

                    <h3 className="mt-1 text-base font-bold text-brand-ink sm:text-lg">
                      {profile.title}
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-brand-muted sm:text-sm sm:leading-6">
                      {profile.description}
                    </p>

                    <ul className="mt-3 space-y-1.5 text-xs leading-5 text-brand-muted sm:text-sm">
                      {profile.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-pink" />
                          {benefit}
                        </li>
                      ))}
                    </ul>

                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-primary">
                      {profile.action}
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-5 rounded-xl border border-brand-border bg-white/70 px-4 py-3 sm:mt-6">
            <p className="text-xs leading-5 text-brand-muted">
              Cada perfil terá uma área própria, com recursos e permissões
              adequados à sua participação na rede de cuidados.
            </p>
          </div>

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
