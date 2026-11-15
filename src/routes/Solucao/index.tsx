
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  HeartHandshake,
  ClipboardList,
  Pill,
  CalendarDays,
  UserRound,
  UsersRound,
  Bell,
  ShieldCheck,
  LockKeyhole,
  Heart,
} from 'lucide-react'

const features = [
  {
    icon: ClipboardList,
    title: 'Rotina de cuidados',
    description:
      'Registro de atividades diárias, alimentação, hidratação e outras informações relevantes para o acompanhamento.',
  },
  {
    icon: Pill,
    title: 'Medicamentos',
    description:
      'Organização dos medicamentos, horários e orientações registradas pelos responsáveis pelo cuidado.',
  },
  {
    icon: CalendarDays,
    title: 'Consultas e compromissos',
    description:
      'Registro de consultas, atividades e compromissos para ajudar a rede de apoio a manter tudo organizado.',
  },
]

const steps = [
  {
    icon: UserRound,
    number: '01',
    title: 'Cadastre as informações',
    description:
      'Registre os dados necessários e organize as informações da rotina de cuidado da pessoa idosa.',
  },
  {
    icon: UsersRound,
    number: '02',
    title: 'Conecte a rede de apoio',
    description:
      'Compartilhe as informações necessárias com familiares e pessoas autorizadas a participar do acompanhamento.',
  },
  {
    icon: Bell,
    number: '03',
    title: 'Acompanhe a rotina',
    description:
      'Consulte os registros e acompanhe as atividades para manter a rede de apoio informada e alinhada.',
  },
]

const principles = [
  {
    icon: ShieldCheck,
    title: 'Acesso controlado',
    description:
      'As informações devem ser compartilhadas somente com pessoas autorizadas, de acordo com as permissões estabelecidas.',
  },
  {
    icon: LockKeyhole,
    title: 'Privacidade das informações',
    description:
      'Os dados pessoais e as informações relacionadas ao cuidado precisam ser tratados com responsabilidade e proteção.',
  },
  {
    icon: Heart,
    title: 'Autonomia da pessoa idosa',
    description:
      'A pessoa idosa deve ser ouvida e participar das decisões sobre quais informações compartilhar e quem pode acessá-las.',
  },
]

export default function Solucao() {
  return (
    <main className="overflow-hidden">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink-light px-4 py-2 text-sm font-bold text-brand-primary">
            <HeartHandshake size={16} />
            A solução Cuidar+
          </span>

          <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Mais organização para cuidar. Mais conexão para acolher.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-8 text-brand-muted sm:text-lg">
            O Cuidar+ propõe um espaço para reunir informações importantes da
            rotina de cuidado, facilitar a comunicação entre familiares e
            aproximar pessoas que precisam de apoio de cuidadores profissionais.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cadastro"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-primary px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              Conheça o Cuidar+
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/sobre"
              className="inline-flex items-center justify-center rounded-full border border-brand-border px-7 py-3.5 text-sm font-bold text-brand-primary transition hover:bg-brand-pink-light"
            >
              Conheça o projeto
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-brand-pink-light blur-3xl" />

          <div className="relative rounded-[2rem] border border-brand-border bg-white p-7 shadow-xl shadow-brand-dark/5 sm:p-10">
            <div className="flex items-center justify-between border-b border-brand-border pb-5">
              <div>
                <p className="text-sm font-semibold text-brand-muted">
                  Cuidar+ em um só lugar
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Uma rotina conectada
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
                <HeartHandshake size={25} />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-brand-background p-5">
                <p className="text-sm font-bold text-brand-dark">
                  Organização do cuidado
                </p>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Informações da rotina reunidas para facilitar o acompanhamento.
                </p>
              </div>

              <div className="rounded-2xl bg-brand-background p-5">
                <p className="text-sm font-bold text-brand-dark">
                  Rede de apoio
                </p>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Familiares e pessoas autorizadas acompanhando as informações
                  compartilhadas.
                </p>
              </div>

              <div className="rounded-2xl bg-brand-background p-5">
                <p className="text-sm font-bold text-brand-dark">
                  Mais autonomia
                </p>
                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  A pessoa idosa participa das decisões sobre seu próprio cuidado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-background px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-pink">
              Organização na prática
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Informações importantes, reunidas em um só lugar.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              A proposta é diminuir a dispersão de informações e tornar o
              acompanhamento da rotina mais simples para quem participa do cuidado.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-brand-border bg-white p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {feature.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-pink">
              Como funciona
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              O cuidado acontece em conjunto.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              A plataforma foi pensada para aproximar as pessoas envolvidas no
              cuidado e facilitar a organização das responsabilidades.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon

              return (
                <article
                  key={step.number}
                  className="rounded-3xl border border-brand-border p-7"
                >
                  <span className="text-sm font-extrabold text-brand-pink">
                    {step.number}
                  </span>
                  <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
                    <Icon size={24} />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-brand-muted">
                    {step.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-background px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-pink">
              Segurança e respeito
            </span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
              Cuidar também é respeitar escolhas.
            </h2>
            <p className="mt-5 text-base leading-8 text-brand-muted">
              A tecnologia deve apoiar o cuidado sem substituir a participação
              da pessoa idosa nas decisões sobre sua própria vida. Por isso,
              privacidade, consentimento e autonomia precisam fazer parte da
              experiência.
            </p>
          </div>

          <div className="space-y-4">
            {principles.map((principle) => {
              const Icon = principle.icon

              return (
                <article
                  key={principle.title}
                  className="flex gap-5 rounded-3xl border border-brand-border bg-white p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
                    <Icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{principle.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-brand-muted">
                      {principle.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
