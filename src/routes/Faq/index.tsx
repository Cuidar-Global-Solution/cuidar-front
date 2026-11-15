
import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

const questions = [
  {
    id: 'what-is',
    question: 'O que é o Cuidar+?',
    answer:
      'O Cuidar+ é uma plataforma pensada para facilitar a organização dos cuidados com pessoas idosas. A proposta é reunir informações importantes da rotina e aproximar familiares, responsáveis e profissionais de cuidado.',
  },
  {
    id: 'who-is-for',
    question: 'Para quem é a plataforma?',
    answer:
      'A plataforma é voltada principalmente para familiares, responsáveis e pessoas que participam da rotina de cuidado de idosos. Também considera profissionais que atuam de forma independente nessa área.',
  },
  {
    id: 'replace-care',
    question: 'O Cuidar+ substitui um cuidador ou profissional de saúde?',
    answer:
      'Não. O Cuidar+ tem como objetivo apoiar a organização e a comunicação entre as pessoas envolvidas no cuidado. A plataforma não substitui o acompanhamento de profissionais de saúde nem o trabalho de um cuidador.',
  },
]

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-brand-background">
      <section className="px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink-light px-4 py-2 text-sm font-bold text-brand-primary">
              <MessageCircle size={16} />
              Central de dúvidas
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Perguntas frequentes
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Reunimos respostas para ajudar você a entender como o Cuidar+
              funciona e de que forma ele pode apoiar a rotina de cuidado.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <h2 className="mb-5 text-xl font-bold sm:text-2xl">
              Sobre o Cuidar+
            </h2>

            <div className="space-y-3">
              {questions.map((item) => {
                const isOpen = openQuestion === item.id

                return (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-brand-border bg-white transition"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenQuestion(isOpen ? null : item.id)
                      }
                      aria-expanded={isOpen}
                      aria-controls={`${item.id}-answer`}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="font-bold text-brand-dark">
                        {item.question}
                      </span>

                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-brand-primary transition-transform ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`${item.id}-answer`}
                        className="border-t border-brand-border px-5 py-5 sm:px-6"
                      >
                        <p className="text-sm leading-7 text-brand-muted sm:text-base">
                          {item.answer}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
