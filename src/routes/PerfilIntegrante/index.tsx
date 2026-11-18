
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  UserRound,
  UsersRound,
} from 'lucide-react'
import { members } from '../../data/members'

export default function PerfilIntegrante() {
  const { id } = useParams()

  const member = members.find((item) => String(item.id) === id)

  if (!member) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-brand-background px-5 py-16">
        <div className="max-w-md text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
            <UsersRound size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-brand-dark">
            Integrante não encontrado
          </h1>

          <p className="mt-3 text-sm leading-7 text-brand-muted">
            Não foi possível localizar esse perfil. Volte à página da equipe
            para conhecer os integrantes do Cuidar+.
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
    <main className="min-h-screen bg-brand-background px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/integrantes"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-muted transition hover:text-brand-primary"
        >
          <ArrowLeft size={17} />
          Voltar para integrantes
        </Link>

        <section className="relative mt-8 overflow-hidden rounded-3xl border border-brand-border bg-white shadow-[0_12px_50px_rgba(59,7,94,0.06)]">
          <div className="relative h-40 overflow-hidden bg-brand-dark sm:h-52">
            <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute -bottom-36 -left-20 h-72 w-72 rounded-full border border-white/10" />
            <div className="absolute right-20 top-10 h-32 w-32 rounded-full bg-brand-primary/40 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-brand-pink via-brand-light to-brand-lavender" />
          </div>

          <div className="relative px-6 pb-10 sm:px-12 sm:pb-12">
            <div className="-mt-20 flex flex-col items-center text-center sm:-mt-24">
              <div className="h-36 w-36 overflow-hidden rounded-full border-[6px] border-white bg-brand-pink-light shadow-lg sm:h-44 sm:w-44">
                <img
                  src={member.image}
                  alt={`Foto de ${member.name}`}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-pink-light px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-primary">
                <UsersRound size={15} />
                Integrante Cuidar+
              </span>

              <h1 className="mt-4 max-w-3xl text-2xl font-bold leading-tight text-brand-dark sm:text-4xl">
                {member.name}
              </h1>

              <p className="mt-3 text-sm font-medium text-brand-muted">
                RM {member.rm} · {member.class}
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-2xl">
              <div className="rounded-2xl border border-brand-border bg-brand-background p-6 text-center sm:p-8">
                <h2 className="text-lg font-bold text-brand-dark">
                  Sobre o integrante
                </h2>

                <p className="mt-3 text-sm leading-7 text-brand-muted">
                  Integrante da equipe de desenvolvimento do Cuidar+, projeto
                  que busca facilitar a organização da rotina de cuidados,
                  promover autonomia e conectar pessoas envolvidas no cuidado.
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-center text-sm font-bold uppercase tracking-[0.16em] text-brand-primary">
                  Conecte-se
                </h2>

                <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-xl border border-brand-border bg-white px-6 py-4 text-sm font-bold text-brand-ink transition hover:border-brand-primary hover:text-brand-primary"
                    >
                      <Code2 size={19} />
                      GitHub
                      <ExternalLink size={15} />
                    </a>
                  )}

                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 rounded-xl border border-brand-border bg-white px-6 py-4 text-sm font-bold text-brand-ink transition hover:border-brand-primary hover:text-brand-primary"
                    >
                      <UserRound size={19} />
                      LinkedIn
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 text-center">
          <Link
            to="/integrantes"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition hover:text-brand-pink"
          >
            <ArrowLeft size={16} />
            Conhecer toda a equipe
          </Link>
        </div>
      </div>
    </main>
  )
}
