
import { UsersRound } from 'lucide-react'

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
        </div>
      </section>
    </div>
  )
}
