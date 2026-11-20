
import { Link } from 'react-router-dom'
import { ArrowRight, Code, UsersRound } from 'lucide-react'
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

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              Pessoas por trás de uma ideia que{' '}
              <span className="text-brand-pink">conecta o cuidado.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Conheça a equipe responsável pelo desenvolvimento do Cuidar+,
              uma proposta que busca tornar a organização dos cuidados mais
              simples, acessível e compartilhada.
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
            <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">
              Conheça os integrantes
            </h2>
            <p className="text-sm leading-7 text-brand-muted sm:text-base">
              Conheça os participantes e acesse seus perfis profissionais.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <article
                key={member.id}
                className="flex flex-col items-center rounded-3xl border border-brand-border bg-white px-6 py-8 text-center shadow-[0_8px_30px_rgba(59,7,94,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(59,7,94,0.10)]"
              >
                <div className="mb-5 h-36 w-36 overflow-hidden rounded-full border-[5px] border-brand-pink-light bg-brand-pink-light shadow-sm sm:h-40 sm:w-40">
                  <img
                    src={member.image}
                    alt={`Foto de ${member.name}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="max-w-xs text-lg font-bold leading-snug text-brand-dark">
                  {member.name}
                </h3>

                <div className="mt-3 flex flex-col gap-1 text-sm text-brand-muted">
                  <span>RM {member.rm}</span>
                  <span>Turma {member.class}</span>
                </div>

               <div className="mt-6 flex items-center justify-center gap-3">
  <a
    href={member.github}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`GitHub de ${member.name}`}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-primary transition hover:border-brand-primary hover:bg-brand-primary hover:text-white"
  >
    <Code size={19} />
  </a>

  <a
    href={member.linkedin}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`LinkedIn de ${member.name}`}
    className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-primary transition hover:border-brand-primary hover:bg-brand-primary hover:text-white"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  </a>
</div>
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
            O Cuidar+ é resultado do trabalho colaborativo de uma equipe
            dedicada a desenvolver uma solução que aproxime pessoas e
            contribua para uma rotina de cuidados mais organizada.
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
