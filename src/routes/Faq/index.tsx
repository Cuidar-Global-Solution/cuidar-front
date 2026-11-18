
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronDown,
  MessageCircle,
} from 'lucide-react'

const sections = [
  {
    title: 'Sobre o Cuidar+',
    questions: [
      {
        id: 'what-is',
        question: 'O que é o Cuidar+?',
        answer:
          'O Cuidar+ é uma plataforma que busca facilitar a organização e o acompanhamento dos cuidados. A proposta é reunir informações importantes da rotina, organizar compromissos e aproximar a pessoa acompanhada, seus familiares e profissionais de cuidado.',
      },
      {
        id: 'who-is-for',
        question: 'Para quem é a plataforma?',
        answer:
          'O Cuidar+ possui três perfis principais: pessoa acompanhada, familiar ou integrante da rede de apoio e cuidador profissional. Cada perfil possui uma experiência adequada à sua participação na rotina de cuidados.',
      },
      {
        id: 'replace-care',
        question: 'O Cuidar+ substitui um cuidador ou profissional de saúde?',
        answer:
          'Não. O Cuidar+ apoia a organização das informações e a comunicação entre as pessoas envolvidas no cuidado. A plataforma não substitui o acompanhamento de profissionais de saúde, o trabalho de um cuidador ou a convivência entre familiares.',
      },
    ],
  },
  {
    title: 'Rotina e funcionalidades',
    questions: [
      {
        id: 'routine',
        question: 'Quais atividades podem ser organizadas?',
        answer:
          'A proposta contempla nove áreas de cuidado: medicamentos, consultas e exames, alimentação, hidratação, medições de saúde, sono, atividades físicas e mobilidade, alertas e bem-estar. Essas áreas ajudam a organizar diferentes aspectos da rotina.',
      },
      {
        id: 'reminders',
        question: 'Qual é a diferença entre lembretes e registros?',
        answer:
          'Lembretes representam atividades planejadas para o futuro, como um horário de medicamento ou uma consulta. Registros representam acontecimentos que já ocorreram, permitindo informar o que foi realizado, quando aconteceu e quem adicionou a informação.',
      },
      {
        id: 'medication',
        question: 'É possível acompanhar os medicamentos?',
        answer:
          'A proposta inclui o cadastro de medicamentos e horários para ajudar na organização da rotina. As informações devem seguir as orientações da prescrição e dos profissionais de saúde responsáveis. O Cuidar+ não recomenda alterações de doses ou tratamentos.',
      },
      {
        id: 'appointments',
        question: 'Posso organizar consultas e exames?',
        answer:
          'Sim. A plataforma prevê uma área de agenda para organizar consultas, exames e outros compromissos, facilitando a visualização das atividades programadas.',
      },
      {
        id: 'history',
        question: 'Como funciona o histórico de cuidados?',
        answer:
          'O histórico busca reunir os lembretes planejados e os acontecimentos registrados, apresentando informações como atividade, data, horário e responsável pelo registro. Assim, as pessoas autorizadas podem acompanhar o que aconteceu ao longo do tempo.',
      },
    ],
  },
  {
    title: 'Perfis e rede de apoio',
    questions: [
      {
        id: 'profiles',
        question: 'Qual é a diferença entre os perfis?',
        answer:
          'A pessoa acompanhada pode consultar sua rotina e participar das decisões sobre o compartilhamento de informações. O familiar ou integrante da rede de apoio pode organizar e acompanhar os cuidados conforme suas permissões. O cuidador profissional pode consultar informações autorizadas e registrar os cuidados realizados.',
      },
      {
        id: 'sharing',
        question: 'Os familiares podem acompanhar as informações cadastradas?',
        answer:
          'A proposta permite compartilhar informações com pessoas autorizadas, respeitando as permissões definidas para cada perfil. Nem todos os participantes precisam ter acesso a todas as informações.',
      },
      {
        id: 'autonomy',
        question: 'A pessoa acompanhada pode decidir quem acessa suas informações?',
        answer:
          'Sim. A autonomia da pessoa acompanhada deve ser respeitada. Sempre que possível, ela participa das decisões sobre quem poderá acompanhar sua rotina e quais informações poderão ser compartilhadas.',
      },
      {
        id: 'caregiver-search',
        question: 'O que é o Cuidar+ Conecta?',
        answer:
          'O Cuidar+ Conecta é uma proposta de espaço para aproximar famílias e cuidadores profissionais independentes. A ideia é permitir buscas por região e tipo de serviço, além da consulta de informações sobre experiência, formação e disponibilidade dos profissionais.',
      },
      {
        id: 'caregiver-employment',
        question: 'Os cuidadores encontrados no Conecta são funcionários do Cuidar+?',
        answer:
          'Não. A proposta do Cuidar+ Conecta é facilitar o contato entre famílias e profissionais independentes. A plataforma não deve ser confundida com uma empresa empregadora ou prestadora direta de serviços de cuidado.',
      },
    ],
  },
  {
    title: 'Tecnologia e recursos adicionais',
    questions: [
      {
        id: 'chatbot',
        question: 'O Cuidar+ possui um assistente com inteligência artificial?',
        answer:
          'O projeto prevê um assistente com inteligência artificial para ajudar na consulta e organização das informações de cuidado. Esse recurso é planejado para apoiar a interpretação dos registros, sem realizar diagnósticos ou substituir orientações profissionais.',
      },
      {
        id: 'reports',
        question: 'É possível gerar relatórios sobre os cuidados?',
        answer:
          'A proposta prevê resumos dos registros de períodos como os últimos 7 ou 30 dias, ajudando a organizar informações para acompanhamento e conversas com profissionais de saúde. Os recursos avançados de relatórios fazem parte da evolução planejada da plataforma.',
      },
      {
        id: 'family-plan',
        question: 'O que é o Plano Família?',
        answer:
          'O Plano Família é uma modalidade planejada com valor de R$ 19,90 por mês. A proposta inclui recursos adicionais, como relatórios com apoio de inteligência artificial e acesso compartilhado, respeitando as permissões de cada participante. Sua disponibilidade depende da implementação do serviço.',
      },
    ],
  },
  {
    title: 'Privacidade, segurança e emergências',
    questions: [
      {
        id: 'data-privacy',
        question: 'Como o Cuidar+ trata os dados pessoais?',
        answer:
          'O projeto considera a proteção dos dados pessoais e o tratamento responsável das informações, seguindo os princípios da Lei Geral de Proteção de Dados (LGPD). A implementação deve adotar medidas adequadas de segurança, privacidade e controle de acesso.',
      },
      {
        id: 'third-party-data',
        question: 'Posso cadastrar informações de saúde de outra pessoa?',
        answer:
          'Informações pessoais e de saúde de terceiros devem ser tratadas com cuidado e autorização adequada. A proposta do Cuidar+ considera a criação do perfil da pessoa acompanhada com seu consentimento, evitando o cadastro indiscriminado de dados de terceiros.',
      },
      {
        id: 'medical-advice',
        question: 'O Cuidar+ oferece orientações médicas?',
        answer:
          'Não. A plataforma não realiza diagnósticos, prescreve medicamentos ou substitui orientações médicas. Seu papel é apoiar a organização das informações e da rotina de cuidado.',
      },
      {
        id: 'emergency',
        question: 'O Cuidar+ funciona como serviço de emergência?',
        answer:
          'Não. A proposta inclui recursos para organizar contatos de confiança e facilitar pedidos de ajuda, mas o Cuidar+ não substitui os serviços oficiais de emergência. Em situações urgentes, entre em contato diretamente com o serviço de atendimento adequado.',
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

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-brand-dark sm:text-5xl lg:text-6xl">
              Perguntas frequentes
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Reunimos respostas para ajudar você a entender como o Cuidar+
              funciona e de que forma ele pode apoiar a organização dos cuidados.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-5 text-xl font-bold text-brand-dark sm:text-2xl">
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
                            className={`shrink-0 text-brand-primary transition-transform duration-200 ${
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

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-dark px-6 py-12 text-center sm:px-12 sm:py-16">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-lavender">
            Ainda tem dúvidas?
          </span>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
            Estamos aqui para ajudar você a entender melhor o Cuidar+.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70 sm:text-base">
            Se não encontrou a resposta que procurava, entre em contato
            conosco. Será um prazer ajudar.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contato"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-pink px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-pink/90"
            >
              Falar com a equipe
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/solucao"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Conhecer a solução
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
