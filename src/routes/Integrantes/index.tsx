
import { Link } from 'react-router-dom'
import { ArrowRight, UsersRound } from 'lucide-react'
import { members } from '../../data/members'

export default function Integrantes() {
  return (
    <div className="min-h-screen bg-brand-background">
      <section className="relative overflow-hidden px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-24">
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand-lavender/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-brand-pink-light blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-bold text-brand-primary">
              <UsersRound size={16} />
              Nossa equipe
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Pessoas por trás de uma ideia que{' '}
              <span className="text-brand-pink">conecta o cuidado.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Conheça quem está desenvolvendo o Cuidar+ e as diferentes
              perspectivas que contribuem para tornar o cuidado mais
              organizado, acessível e próximo das pessoas.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col gap-3 text-center">
            <span className="text-sm font-bold uppercase tracking-[0.18em] text-brand-primary">
              Quem faz acontecer
            </span>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Conheça os integrantes
            </h2>
            <p className="text-sm leading-7 text-brand-muted sm:text-base">
              Acesse o perfil de cada integrante para conhecer sua trajetória
              e participação no projeto.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article
                key={member.id}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-full border-[6px] border-white bg-brand-pink-light shadow-[0_8px_30px_rgba(59,7,94,0.10)] sm:h-48 sm:w-48">
                  <img
                    src={member.image}
                    alt={`Foto de ${member.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="max-w-xs text-lg font-bold leading-snug">
                  {member.name}
                </h3>

                <p className="mt-2 text-sm text-brand-muted">
                  RM {member.rm} · {member.class}
                </p>

                <Link
                  to={`/integrantes/${member.id}`}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
                >
                  Ver perfil
                  <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-dark px-7 py-12 text-center sm:px-12 sm:py-14">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Uma ideia construída em conjunto.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            O Cuidar+ nasceu da colaboração e do compromisso de desenvolver
            uma proposta que contribua para uma rotina de cuidados mais
            conectada.
          </p>
          <Link
            to="/solucao"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-brand-dark transition hover:bg-brand-pink-light"
          >
            Conheça a solução
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
