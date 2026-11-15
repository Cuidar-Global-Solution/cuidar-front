
import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

const sections = [
  {
    title: 'Sobre o Cuidar+',
    questions: [
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
    ],
  },
  {
    title: 'Funcionalidades e organização',
    questions: [
      {
        id: 'routine',
        question: 'Como posso organizar a rotina de cuidados?',
        answer:
          'A proposta é permitir o registro de atividades importantes, como horários, alimentação, hidratação, compromissos e outras informações relevantes para o acompanhamento diário.',
      },
      {
        id: 'medication',
        question: 'É possível acompanhar os horários dos medicamentos?',
        answer:
          'A plataforma prevê recursos para registrar medicamentos e seus horários, ajudando os responsáveis a acompanhar a rotina. Essas informações devem seguir sempre as orientações dos profissionais de saúde.',
      },
      {
        id: 'appointments',
        question: 'Posso registrar consultas e compromissos?',
        answer:
          'Sim. A proposta inclui uma área para organizar consultas, exames e outros compromissos, facilitando o acompanhamento das atividades programadas.',
      },
    ],
  },
  {
    title: 'Famílias e profissionais',
    questions: [
      {
        id: 'sharing',
        question: 'Os familiares podem acompanhar as informações cadastradas?',
        answer:
          'A proposta do Cuidar+ é permitir o compartilhamento de informações com pessoas autorizadas, facilitando a comunicação entre familiares e responsáveis pela rotina de cuidado.',
      },
      {
        id: 'caregiver-search',
        question: 'Como encontrar um cuidador pela plataforma?',
        answer:
          'A proposta inclui uma área de busca regional para encontrar profissionais independentes, com informações sobre experiência, formação e disponibilidade. A contratação e a avaliação do profissional devem ser feitas diretamente pelos envolvidos.',
      },
      {
        id: 'caregiver-employment',
        question: 'Os cuidadores são funcionários do Cuidar+?',
        answer:
          'Não. A proposta é aproximar famílias e profissionais independentes. A plataforma não deve ser confundida com uma empresa empregadora ou prestadora direta de serviços de cuidado.',
      },
    ],
  },
  {
    title: 'Privacidade e segurança',
    questions: [
      {
        id: 'data-privacy',
        question: 'Como o Cuidar+ trata os dados pessoais?',
        answer:
          'A proposta considera a proteção das informações pessoais e o tratamento responsável dos dados, seguindo os princípios da Lei Geral de Proteção de Dados (LGPD). A implementação deve definir medidas adequadas de segurança e privacidade.',
      },
      {
        id: 'access',
        question: 'Quem pode acessar as informações de uma pessoa idosa?',
        answer:
          'O acesso deve ser restrito às pessoas autorizadas, de acordo com as permissões definidas para cada perfil. Informações pessoais não devem ser compartilhadas indiscriminadamente.',
      },
      {
        id: 'autonomy',
        question: 'A pessoa idosa pode decidir quem acompanha sua rotina?',
        answer:
          'Sim. Sempre que possível, a pessoa idosa deve participar das decisões sobre seu cuidado e sobre quais informações deseja compartilhar. Sua autonomia e suas preferências precisam ser respeitadas.',
      },
      {
        id: 'medical-advice',
        question: 'O Cuidar+ oferece orientações médicas?',
        answer:
          'Não. A plataforma não realiza diagnósticos, prescreve medicamentos ou substitui orientações médicas. Seu papel é apoiar a organização das informações e da rotina de cuidado.',
      },
      {
        id: 'emergency',
        question: 'O que fazer em uma situação de emergência?',
        answer:
          'O Cuidar+ não é um serviço de emergência. Em situações urgentes, procure imediatamente os serviços de emergência ou atendimento de saúde adequados.',
      },
    ],
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

          <div className="mx-auto mt-14 max-w-3xl space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-5 text-xl font-bold sm:text-2xl">
                  {section.title}
                </h2>

                <div className="space-y-3">
                  {section.questions.map((item) => {
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
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
