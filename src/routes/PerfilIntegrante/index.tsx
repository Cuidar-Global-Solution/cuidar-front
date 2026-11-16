
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  UserRound,
} from 'lucide-react'
import { members } from '../../data/members'

export default function PerfilIntegrante() {
  const { id } = useParams()
  const member = members.find((item) => item.id === id)

  if (!member) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold">Perfil não encontrado</h1>
          <p className="mt-4 leading-7 text-brand-muted">
            Não encontramos o integrante que você está procurando.
          </p>
          <Link
            to="/integrantes"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-dark"
          >
            <ArrowLeft size={16} />
            Voltar para a equipe
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-brand-background px-5 pb-20 pt-12 sm:px-8 sm:pt-16">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/integrantes"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition hover:text-brand-pink"
        >
          <ArrowLeft size={17} />
          Voltar para integrantes
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-brand-border bg-white shadow-[0_12px_40px_rgba(59,7,94,0.06)]">
          <div className="h-3 bg-linear-to-r from-brand-primary via-brand-light to-brand-pink" />

          <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-[240px_1fr] md:gap-12 md:p-12">
            <div className="flex flex-col items-center">
              <div className="h-48 w-48 overflow-hidden rounded-full border-[7px] border-brand-pink-light bg-brand-pink-light shadow-md sm:h-56 sm:w-56">
                <img
                  src={member.image}
                  alt={`Foto de ${member.name}`}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full bg-brand-pink-light px-4 py-2 text-xs font-bold text-brand-primary">
                  RM {member.rm}
                </span>
                <span className="rounded-full bg-brand-pink-light px-4 py-2 text-xs font-bold text-brand-primary">
                  {member.class}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-center text-center md:text-left">
              <span className="text-sm font-bold uppercase tracking-[0.16em] text-brand-pink">
                Integrante Cuidar+
              </span>

              <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
                {member.name}
              </h1>

              <p className="mt-5 leading-8 text-brand-muted">
                {member.presentation}
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-3 md:justify-start">
                <a
                  href={member.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-dark px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-primary"
                >
                  <Code2 size={17} />
                  GitHub
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-5 py-3 text-sm font-bold text-brand-primary transition hover:border-brand-primary"
                >
                  <BriefcaseBusiness size={17} />
                  LinkedIn
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-3xl border border-brand-border bg-white p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
              <BriefcaseBusiness size={21} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Participação no projeto
            </h2>

            <p className="mt-3 text-sm leading-7 text-brand-muted">
              {member.contribution}
            </p>
          </article>

          <article className="rounded-3xl border border-brand-border bg-white p-7 sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
              <GraduationCap size={21} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Informações acadêmicas
            </h2>

            <div className="mt-4 space-y-3 text-sm text-brand-muted">
              <p className="flex items-center gap-3">
                <UserRound size={17} className="shrink-0 text-brand-primary" />
                Análise e Desenvolvimento de Sistemas
              </p>
              <p className="flex items-center gap-3">
                <GraduationCap size={17} className="shrink-0 text-brand-primary" />
                FIAP · {member.class}
              </p>
              <p className="flex items-center gap-3">
                <Code2 size={17} className="shrink-0 text-brand-primary" />
                RM {member.rm}
              </p>
            </div>
          </article>
        </section>

        {(member.skills.length > 0 || member.technologies.length > 0) && (
          <section className="mt-8 rounded-3xl border border-brand-border bg-white p-7 sm:p-8">
            <h2 className="text-xl font-bold">Habilidades e tecnologias</h2>

            {member.skills.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-bold text-brand-muted">
                  Habilidades
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-brand-pink-light px-4 py-2 text-sm font-semibold text-brand-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {member.technologies.length > 0 && (
              <div className="mt-5">
                <h3 className="text-sm font-bold text-brand-muted">
                  Tecnologias
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {member.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full bg-brand-pink-light px-4 py-2 text-sm font-semibold text-brand-primary"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/integrantes"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition hover:text-brand-pink"
          >
            <ArrowLeft size={16} />
            Conhecer os outros integrantes
          </Link>
        </div>
      </div>
    </main>
  )
}
