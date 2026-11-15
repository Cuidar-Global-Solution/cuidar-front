
import { Link } from 'react-router-dom'
import { ArrowRight, HeartHandshake } from 'lucide-react'

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
    </main>
  )
}
