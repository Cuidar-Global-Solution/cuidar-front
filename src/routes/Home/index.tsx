
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
    title: 'Rotina em um só lugar',
    description:
      'Organize lembretes e registre o que aconteceu no dia a dia, mantendo as informações reunidas.',
  },
  {
    icon: CalendarDays,
    title: 'Acompanhamento completo',
    description:
      'Acompanhe medicamentos, consultas, alimentação, hidratação, sono e outras áreas de cuidado.',
  },
  {
    icon: Users,
    title: 'Cuidado compartilhado',
    description:
      'Aproxime familiares e cuidadores, com acesso definido pelas permissões de cada pessoa.',
  },
  {
    icon: ShieldCheck,
    title: 'Autonomia e segurança',
    description:
      'A pessoa acompanhada participa da própria rotina e decide o que compartilhar e com quem.',
  },
]

const careAreas = [
  'Medicamentos',
  'Consultas e exames',
  'Alimentação',
  'Hidratação',
  'Medições de saúde',
  'Sono',
  'Atividades físicas e mobilidade',
  'Alertas',
  'Bem-estar',
]

const benefits = [
  'Organização de lembretes e compromissos',
  'Registro de atividades e acontecimentos',
  'Histórico com data, horário e responsável pelo registro',
  'Compartilhamento de informações conforme as permissões',
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
              Todo cuidado em uma só plataforma.
              <span className="text-brand-primary">
                {' '}Mais organização, autonomia e conexão.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
              O Cuidar+ reúne a rotina de cuidados em um só lugar, aproximando
              a pessoa acompanhada, seus familiares e cuidadores profissionais.
              Tudo com mais clareza sobre o que precisa ser feito, o que
              aconteceu e quem participou.
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
                Rotina organizada
              </span>
              <span className="inline-flex items-center gap-2">
                <Check size={16} className="text-brand-success" />
                Autonomia respeitada
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
                  <h2 className="mt-1 text-xl font-semibold">
                    Uma rotina mais organizada
                  </h2>
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
                      Acompanhamento do cuidado
                    </p>
                    <p className="mt-0.5 text-xs text-brand-muted">
                      Planeje, acompanhe e registre
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    'Lembretes e compromissos',
                    'Registros do que aconteceu',
                    'Histórico de cuidados',
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
                  <p className="mt-3 text-sm font-bold">Rede de apoio</p>
                  <p className="mt-1 text-xs leading-5 text-white/75">
                    Participação autorizada
                  </p>
                </div>
                <div className="rounded-2xl bg-brand-pink p-4 text-white">
                  <HeartHandshake size={21} />
                  <p className="mt-3 text-sm font-bold">Pessoa acompanhada</p>
                  <p className="mt-1 text-xs leading-5 text-white/80">
                    Autonomia e participação
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
              O cuidado envolve muito mais do que compromissos.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Medicamentos, consultas e atividades do dia a dia fazem parte
              de uma rotina que pode envolver diferentes pessoas. O Cuidar+
              propõe reunir essas informações para facilitar a organização,
              a comunicação e o acompanhamento.
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

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
            Acompanhamento integrado
          </span>
          <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
            Nove áreas para acompanhar o cuidado de forma mais completa.
          </h2>
          <p className="mt-5 text-base leading-8 text-brand-muted">
            Cada área reúne informações importantes da rotina. Assim, quem
            participa do cuidado pode consultar os registros e acompanhar
            o que foi planejado e realizado, respeitando as permissões definidas.
          </p>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {careAreas.map((area, index) => (
            <div
              key={area}
              className="flex items-center gap-3 rounded-xl border border-brand-border bg-white px-5 py-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-pink-light text-sm font-bold text-brand-primary">
                {index + 1}
              </span>
              <span className="text-sm font-semibold text-brand-ink">
                {area}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/solucao"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition hover:text-brand-dark"
          >
            Conhecer todas as funcionalidades
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <div className="rounded-4xl border border-brand-border bg-brand-background p-6 shadow-xl shadow-purple-100 sm:p-9">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink-light">
                  <Search size={24} className="text-brand-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                    Cuidar+ Conecta
                  </p>
                  <h3 className="text-xl font-semibold">
                    Encontre apoio profissional
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-brand-muted">
                O Cuidar+ Conecta aproxima famílias de cuidadores
                independentes. A busca considera região, disponibilidade,
                experiência e serviços oferecidos.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Busca por cidade ou bairro',
                  'Perfis e informações profissionais',
                  'Possibilidade de publicar pedidos de cuidado',
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
                to="/conecta"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-primary px-5 py-3.5 text-sm font-bold text-brand-primary transition hover:bg-brand-pink-light"
              >
                Conhecer o Cuidar+ Conecta
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              Uma rede de apoio
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
              O cuidado pode ser compartilhado, sem perder a autonomia.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              Familiares e cuidadores podem participar da rotina, mas o
              compartilhamento deve respeitar as escolhas e as permissões
              da pessoa acompanhada. Cada vínculo pode ter diferentes
              possibilidades de acesso e registro.
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
        </div>
      </section>

      <section className="px-5 pb-16 pt-16 sm:px-8 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-brand-dark px-6 py-14 text-center sm:px-12 sm:py-16">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-lavender">
            Cuidar+
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
            Mais organização para cuidar. Mais conexão para acolher.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Conheça a proposta do Cuidar+ e descubra como reunir informações,
            organizar responsabilidades e aproximar quem participa do cuidado.
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
