
import { HeartHandshake } from 'lucide-react'

export default function Sobre() {
  return (
    <div className="bg-brand-background">
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
            Sobre o Cuidar+
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Cuidar de quem importa merece atenção em cada detalhe.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
            O Cuidar+ é uma proposta de plataforma digital criada para
            facilitar a organização dos cuidados com pessoas idosas,
            aproximando familiares e cuidadores profissionais em uma rede
            de apoio mais conectada.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-brand-dark p-8 text-white sm:p-10">
            <HeartHandshake size={34} className="text-brand-lavender" />

            <h2 className="mt-6 text-2xl font-semibold text-white">
              Cuidado compartilhado
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75">
              Acreditamos que o cuidado se torna mais organizado quando
              familiares e profissionais conseguem acompanhar as informações
              importantes e participar da rotina de maneira coordenada.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-brand-border bg-white p-8 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">
              Nossa proposta
            </span>

            <h2 className="mt-4 text-2xl font-semibold">
              Mais organização para quem cuida. Mais atenção para quem recebe cuidado.
            </h2>

            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Reunimos, em uma única proposta, recursos para organizar
              atividades diárias, acompanhar compromissos e facilitar
              a conexão entre as pessoas envolvidas no cuidado.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
