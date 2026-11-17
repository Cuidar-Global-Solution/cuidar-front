
import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
} from 'lucide-react'

const careTypes = [
  'Acompanhamento diário',
  'Companhia',
  'Cuidados pessoais',
  'Acompanhamento em consultas',
  'Mobilidade e atividades',
  'Cuidados especializados',
]

export default function Conecta() {
  const [location, setLocation] = useState('')
  const [careType, setCareType] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSearchSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-brand-background">
      <section className="relative overflow-hidden bg-brand-dark">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-48 right-20 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white/80 sm:text-sm">
              <HeartHandshake size={16} className="text-brand-pink" />
              Cuidar+ Conecta
            </span>

            <h1 className="mt-7 max-w-2xl text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              O cuidado certo começa com uma boa conexão.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-white/70 sm:text-lg">
              Encontre cuidadores independentes, conheça suas experiências e
              aproxime profissionais da rotina de quem precisa de cuidado.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#buscar-profissionais"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-pink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-primary"
              >
                Encontrar cuidadores
                <ArrowRight size={17} />
              </a>

              <Link
                to="/cadastro/cuidador"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Sou profissional
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="text-brand-pink" />
                Mais transparência
              </span>
              <span className="flex items-center gap-2">
                <UsersRound size={17} className="text-brand-pink" />
                Conexões próximas
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-pink text-white">
                <HeartHandshake size={29} />
              </div>

              <h2 className="mt-6 text-2xl font-bold text-white">
                Uma rede que aproxima
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/70">
                O Cuidar+ Conecta facilita o encontro entre quem precisa de
                apoio e profissionais que oferecem serviços de cuidado.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  'Conheça profissionais independentes',
                  'Consulte experiências e avaliações',
                  'Encontre serviços na sua região',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-brand-pink"
                    />
                    <span className="text-sm text-white/85">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="buscar-profissionais"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink sm:text-sm">
            Encontre apoio
          </span>

          <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
            Busque profissionais de cuidado
          </h2>

          <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
            Informe sua região e o tipo de acompanhamento que procura para
            encontrar profissionais compatíveis com sua necessidade.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="mt-10 rounded-3xl border border-brand-border bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-5 flex items-center gap-2">
            <SlidersHorizontal size={19} className="text-brand-primary" />
            <h3 className="font-bold text-brand-ink">
              Personalize sua busca
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-bold text-brand-ink"
              >
                Região
              </label>

              <div className="flex items-center gap-3 rounded-xl border border-brand-border px-4 transition focus-within:border-brand-primary focus-within:ring-4 focus-within:ring-brand-primary/10">
                <MapPin size={19} className="shrink-0 text-brand-muted" />
                <input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value)
                    setSearchSubmitted(false)
                  }}
                  placeholder="Cidade, bairro ou CEP"
                  className="h-12 w-full bg-transparent text-sm text-brand-ink outline-none placeholder:text-brand-muted"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="careType"
                className="mb-2 block text-sm font-bold text-brand-ink"
              >
                Tipo de cuidado
              </label>

              <select
                id="careType"
                value={careType}
                onChange={(event) => {
                  setCareType(event.target.value)
                  setSearchSubmitted(false)
                }}
                className="h-12 w-full rounded-xl border border-brand-border bg-white px-4 text-sm text-brand-ink outline-none transition focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10"
              >
                <option value="">Todos os tipos</option>
                {careTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-7 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              <Search size={18} />
              Buscar
            </button>
          </div>
        </form>

        <div className="mt-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-bold text-brand-ink">
                Profissionais disponíveis
              </h3>
              <p className="mt-1 text-sm text-brand-muted">
                Conheça pessoas que podem fazer parte da rede de cuidados.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-dashed border-brand-border bg-white px-6 py-12 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
              <Search size={29} />
            </div>

            <h4 className="mt-5 text-lg font-bold text-brand-ink">
              {searchSubmitted
                ? 'Sua busca está pronta para ser integrada'
                : 'Estamos preparando a rede de profissionais'}
            </h4>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-brand-muted">
              {searchSubmitted
                ? 'Os filtros foram preenchidos, mas a consulta de profissionais ainda depende da integração com a API do Cuidar+.'
                : 'Em breve, você poderá visualizar perfis profissionais, consultar experiências, avaliações e encontrar cuidadores na sua região.'}
            </p>

            {(location || careType) && (
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {location && (
                  <span className="rounded-full bg-brand-pink-light px-3 py-1.5 text-xs font-semibold text-brand-primary">
                    Região: {location}
                  </span>
                )}
                {careType && (
                  <span className="rounded-full bg-brand-pink-light px-3 py-1.5 text-xs font-semibold text-brand-primary">
                    {careType}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-pink sm:text-sm">
              Como funciona
            </span>
            <h2 className="mt-3 text-3xl font-bold text-brand-ink sm:text-4xl">
              Uma conexão em três etapas
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
              Um caminho mais simples para encontrar e conhecer profissionais
              de cuidado.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-brand-border bg-brand-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                <Search size={23} />
              </div>
              <span className="mt-6 block text-xs font-bold uppercase tracking-wider text-brand-pink">
                Etapa 01
              </span>
              <h3 className="mt-2 text-lg font-bold text-brand-ink">
                Faça sua busca
              </h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                Informe a região e o tipo de acompanhamento que procura.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                <BriefcaseBusiness size={23} />
              </div>
              <span className="mt-6 block text-xs font-bold uppercase tracking-wider text-brand-pink">
                Etapa 02
              </span>
              <h3 className="mt-2 text-lg font-bold text-brand-ink">
                Conheça os perfis
              </h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                Consulte informações profissionais, experiências e avaliações.
              </p>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                <CalendarDays size={23} />
              </div>
              <span className="mt-6 block text-xs font-bold uppercase tracking-wider text-brand-pink">
                Etapa 03
              </span>
              <h3 className="mt-2 text-lg font-bold text-brand-ink">
                Entre em contato
              </h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                Converse com o profissional e avalie a possibilidade de iniciar
                uma parceria de cuidado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-brand-pink-light p-7 sm:p-10 lg:flex-row lg:items-center lg:p-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-brand-primary">
              Para profissionais
            </span>
            <h2 className="mt-3 text-2xl font-bold text-brand-dark sm:text-3xl">
              Você trabalha com cuidado? Faça parte dessa rede.
            </h2>
            <p className="mt-4 text-sm leading-7 text-brand-muted sm:text-base">
              Apresente sua experiência, divulgue seus serviços e aproxime-se
              de pessoas e famílias que procuram apoio.
            </p>
          </div>

          <Link
            to="/cadastro/cuidador"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            Criar perfil profissional
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  )
}
