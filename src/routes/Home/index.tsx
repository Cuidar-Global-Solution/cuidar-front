
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  Heart,
  HeartHandshake,
  Search,
  ShieldCheck,
  Users,
} from 'lucide-react'

const features = [
  {
    icon: ClipboardList,
    title: 'Rotina organizada',
    description:
      'Reúna tarefas, compromissos e informações importantes em um só lugar.',
  },
  {
    icon: CalendarDays,
    title: 'Medicamentos e consultas',
    description:
      'Organize horários de medicamentos e acompanhe consultas e exames.',
  },
  {
    icon: Users,
    title: 'Cuidado compartilhado',
    description:
      'Mantenha familiares e cuidadores autorizados alinhados sobre a rotina.',
  },
  {
    icon: ShieldCheck,
    title: 'Mais segurança',
    description:
      'Tenha informações e contatos importantes acessíveis quando necessário.',
  },
]

const benefits = [
  'Organização das atividades diárias',
  'Acompanhamento de compromissos',
  'Informações compartilhadas com pessoas autorizadas',
  'Mais clareza na comunicação entre familiares e cuidadores',
]

function Home() {
  return (
    <div className="overflow-hidden bg-brand-background">
      <section className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-xs font-bold tracking-wide text-brand-primary">
              <Heart size={14} className="text-brand-pink" />
              CUIDADO QUE CONECTA
            </span>

            <h1 className="mt-7 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Cuidar de quem importa pode ser{' '}
              <span className="text-brand-primary">mais simples.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              Uma plataforma para organizar a rotina de cuidados de pessoas
              idosas e aproximar familiares e profissionais em cada etapa
              dessa jornada.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/cadastro"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-7 py-4 text-sm font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                Começar agora
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/solucao"
                className="inline-flex items-center justify-center rounded-xl border border-brand-border bg-white px-7 py-4 text-sm font-bold text-brand-primary transition hover:border-brand-primary hover:bg-brand-pink-light"
              >
                Conhecer a solução
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-brand-muted">
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-brand-success" />
                Rotina centralizada
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-brand-success" />
                Cuidado compartilhado
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-lavender/50 blur-3xl" />
            <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-brand-pink-light blur-3xl" />

            <div className="relative rounded-4xl border border-brand-border bg-white p-5 shadow-2xl shadow-purple-100 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
                    Cuidar+
                  </p>
                  <h2 className="mt-1 text-xl font-semibold">Um cuidado mais próximo</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink-light">
                  <HeartHandshake size={25} className="text-brand-primary" />
                </div>
              </div>

              <div className="mt-7 rounded-2xl bg-brand-background p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-lavender/60">
                    <Heart size={20} className="text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-ink">
                      Cuidado em conjunto
                    </p>
                    <p className="mt-0.5 text-xs text-brand-muted">
                      Tudo mais organizado em um só lugar
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    'Rotina diária',
                    'Medicamentos e horários',
                    'Consultas e compromissos',
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-4 py-3"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-pink-light">
                        <Check size={15} className="text-brand-primary" />
                      </div>
                      <span className="text-sm font-semibold text-brand-ink">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-brand-primary p-4 text-white">
                  <Users size={21} />
                  <p className="mt-3 text-sm font-bold">Família</p>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    Participação no cuidado
                  </p>
                </div>
                <div className="rounded-2xl bg-brand-pink p-4 text-white">
                  <HeartHandshake size={21} />
                  <p className="mt-3 text-sm font-bold">Cuidadores</p>
                  <p className="mt-1 text-xs leading-5 text-white/80">
                    Apoio profissional
                  </p>
                </div>
              </div>
              <p className="mt-4 text-center text-[11px] text-brand-muted">
                Ilustração conceitual da proposta da plataforma
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              Por que Cuidar+?
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              Cuidar de alguém também exige organização.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Quando as informações ficam espalhadas, acompanhar a rotina
              pode se tornar difícil. O Cuidar+ reúne o que é importante
              para facilitar a comunicação e apoiar quem participa desse cuidado.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-brand-border bg-brand-background p-6 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light">
                    <Icon size={23} className="text-brand-primary" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {feature.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-24">
        <div className="order-2 lg:order-1">
          <div className="rounded-4xl border border-brand-border bg-white p-6 shadow-xl shadow-purple-100 sm:p-9">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink-light">
                <Search size={24} className="text-brand-primary" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Cuidar+ Conecta
                </p>
                <h3 className="text-xl font-semibold">Encontre apoio profissional</h3>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-brand-muted">
              Uma forma de aproximar famílias de cuidadores independentes,
              facilitando a busca por profissionais de acordo com suas
              necessidades e região.
            </p>

            <div className="mt-6 space-y-3">
              {[
                'Busca por região',
                'Perfil e experiência profissional',
                'Informações para facilitar a escolha',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={17} className="shrink-0 text-brand-success" />
                  <span className="text-sm font-semibold text-brand-ink">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              to="/cuidadores"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-primary px-5 py-3.5 text-sm font-bold text-brand-primary transition hover:bg-brand-pink-light"
            >
              Conhecer o Cuidar+ Conecta
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
            Uma rede de apoio
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            Ninguém precisa organizar tudo sozinho.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            O cuidado pode envolver diferentes pessoas. Por isso, o Cuidar+
            busca aproximar familiares e profissionais, respeitando as
            autorizações e as necessidades de cada pessoa idosa.
          </p>

          <ul className="mt-7 space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-pink-light">
                  <Check size={14} className="text-brand-primary" />
                </span>
                <span className="text-sm leading-6 text-brand-ink">
                  {benefit}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-brand-dark px-6 py-14 text-center sm:px-12 sm:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lavender">
            Cuidar+ 
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Mais organização para cuidar. Mais conexão para acolher.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Conheça a proposta do Cuidar+ e descubra como uma rotina mais
            organizada pode ajudar quem cuida e quem recebe cuidado.
          </p>
          <Link
            to="/sobre"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-brand-primary transition hover:bg-brand-pink-light"
          >
            Conhecer o Cuidar+
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
