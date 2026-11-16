import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  UsersRound,
} from 'lucide-react'

const members = [
  {
    name: 'Leonardo Arnaldo Cerqueira da Silva',
    image: '/assets/img02-leonardo.jpeg',
    rm: '573188',
    class: '1TDSPJ',
    github: 'https://github.com/LeonardoSilva1203',
    linkedin: 'https://www.linkedin.com/in/leonardo-cerqueira-12a400400/',
  },
  {
    name: 'Guilherme Matheus Magalhães Almeida',
    image: '/assets/img03-guilherme.jpeg',
    rm: '571713',
    class: '1TDSPJ',
    github: 'https://github.com/guimmalmd',
    linkedin: 'http://www.linkedin.com/in/guimmalmeida',
  },
  {
    name: 'Thiago Rodrigues Santa Rosa',
    image: '/assets/img04-thiago.jpeg',
    rm: '572616',
    class: '1TDSPJ',
    github: 'https://github.com/Thiagordsr',
    linkedin: 'https://www.linkedin.com/in/thiago-rodrigues-santa-rosa-39b3b3305/',
  },
  {
    name: 'Beatriz Urbano Marques de Oliveira',
    image: '/assets/img05-beatriz.jpeg',
    rm: '569341',
    class: '1TDSPJ',
    github: 'https://github.com/BeaUrbano',
    linkedin: 'https://www.linkedin.com/in/beatriz-urbano-5a9bab254',
  },
  {
    name: 'Geovanna Secchi Egea',
    image: '/assets/img06-geovanna.jpeg',
    rm: '573452',
    class: '1TDSPJ',
    github: 'https://github.com/geovannasecchi',
    linkedin: 'https://www.linkedin.com/in/geovanna-secchi-egea-3194553b5/',
  },
]

export default function Integrantes() {
  return (
    <div className="min-h-screen bg-brand-background">
      <section className="px-5 pb-20 pt-20 sm:px-8 lg:px-10 lg:pb-28 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink-light px-4 py-2 text-sm font-bold text-brand-primary">
              <UsersRound size={16} />
              Nossa equipe
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Pessoas por trás do Cuidar+.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Conheça a equipe responsável pelo desenvolvimento do Cuidar+,
              um projeto criado para aproximar pessoas e tornar a rotina
              de cuidado mais organizada.
            </p>
          </div>

          <div className="mt-16 rounded-3xl border border-brand-border bg-white px-6 py-10 text-center sm:px-10 sm:py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-pink-light text-brand-primary">
              <UsersRound size={30} />
            </div>

            <h2 className="mt-6 text-2xl font-bold sm:text-3xl">
              Uma equipe, um propósito.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
              O Cuidar+ nasceu do trabalho colaborativo de estudantes
              que buscam aplicar tecnologia a um desafio real: apoiar
              famílias e profissionais na organização do cuidado com
              pessoas idosas.
            </p>
          </div>

          <div className="mt-16">
            <div className="mb-8">
              <span className="text-sm font-bold uppercase tracking-wider text-brand-primary">
                Quem faz acontecer
              </span>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Conheça os integrantes
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-brand-muted sm:text-base">
                Estudantes de Análise e Desenvolvimento de Sistemas
                trabalhando juntos na construção desta solução.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <article
                  key={member.rm}
                  className="overflow-hidden rounded-2xl border border-brand-border bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="aspect-4/3 overflow-hidden bg-brand-pink-light">
                    <img
                      src={member.image}
                      alt={`Foto de ${member.name}`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold leading-snug">
                      {member.name}
                    </h3>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-lg bg-brand-pink-light px-3 py-1.5 text-xs font-bold text-brand-primary">
                        RM {member.rm}
                      </span>

                      <span className="rounded-lg bg-brand-background px-3 py-1.5 text-xs font-bold text-brand-muted">
                        {member.class}
                      </span>
                    </div>

                    <div className="mt-6 flex gap-3 border-t border-brand-border pt-5">
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`GitHub de ${member.name}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-background px-3 py-3 text-sm font-bold text-brand-ink transition hover:bg-brand-pink-light hover:text-brand-primary"
                      >
                        <Code2 size={17} />
                        GitHub
                        <ExternalLink size={13} />
                      </a>

                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`LinkedIn de ${member.name}`}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-background px-3 py-3 text-sm font-bold text-brand-ink transition hover:bg-brand-pink-light hover:text-brand-primary"
                      >
                        <BriefcaseBusiness size={17} />
                        LinkedIn
                        <ExternalLink size={13} />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-brand-dark px-6 py-12 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-lavender">
              Nosso propósito
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
              Tecnologia com um olhar mais humano para o cuidado.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/70 sm:text-base">
              Mais do que desenvolver uma plataforma, buscamos pensar
              em maneiras de facilitar a rotina de quem cuida e valorizar
              a autonomia de quem recebe esse cuidado.
            </p>

            <Link
              to="/solucao"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-pink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-pink/90"
            >
              Conhecer nossa solução
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
