
import { useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  CircleHelp,
  LockKeyhole,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
} from 'lucide-react'

const contactOptions = [
  'Dúvidas sobre a plataforma',
  'Pessoa acompanhada e autonomia',
  'Familiares e rede de apoio',
  'Rotina, lembretes e registros',
  'Cuidar+ Conecta e profissionais',
  'Privacidade e permissões de acesso',
  'Sugestões e melhorias',
  'Outros assuntos',
]

export default function Contato() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  })

  const [feedback, setFeedback] = useState('')

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    setFeedback('')
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setFeedback(
      'Preenchimento validado. O envio da mensagem estará disponível quando o formulário for conectado ao serviço de atendimento.',
    )
  }

  return (
    <div className="min-h-screen bg-brand-background">
      <section className="px-5 pb-16 pt-20 sm:px-8 lg:px-10 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-pink-light px-4 py-2 text-sm font-bold text-brand-primary">
              <MessageCircle size={16} />
              Entre em contato
            </span>

            <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Estamos aqui para ouvir você.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
              Tem alguma dúvida sobre a plataforma, a organização dos
              cuidados ou o Cuidar+ Conecta? Compartilhe sua mensagem
              com a gente.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Vamos conversar?
                </h2>

                <p className="mt-3 text-base leading-7 text-brand-muted">
                  O Cuidar+ reúne pessoas acompanhadas, familiares,
                  pessoas da rede de apoio e cuidadores profissionais.
                  Queremos conhecer suas dúvidas e sugestões sobre essa
                  experiência.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                  <Mail size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Fale sobre sua experiência
                </h3>

                <p className="mt-2 text-sm leading-7 text-brand-muted">
                  Escolha o assunto que melhor representa sua solicitação
                  e descreva sua dúvida, sugestão ou interesse.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                  <ShieldCheck size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Respeito à sua privacidade
                </h3>

                <p className="mt-2 text-sm leading-7 text-brand-muted">
                  O compartilhamento de informações de cuidado deve
                  respeitar a autorização da pessoa acompanhada.
                  Evite incluir dados pessoais ou informações de saúde
                  de terceiros neste formulário.
                </p>
              </div>

              <div className="rounded-2xl bg-brand-dark p-6 text-white">
                <span className="text-sm font-bold uppercase tracking-wider text-brand-lavender">
                  Cuidar+
                </span>

                <p className="mt-3 text-xl font-semibold leading-relaxed">
                  Cuidado que conecta pessoas, famílias e profissionais.
                </p>
              </div>
            </div>

            <div className="rounded-3xl border border-brand-border bg-white p-6 shadow-sm sm:p-9">
              <div className="mb-8">
                <h2 className="text-2xl font-bold">
                  Envie sua mensagem
                </h2>

                <p className="mt-2 text-sm leading-6 text-brand-muted">
                  Preencha os campos abaixo para apresentar sua dúvida
                  ou solicitação.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-brand-ink"
                  >
                    Nome completo
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={3}
                    placeholder="Como podemos chamar você?"
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3.5 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-bold text-brand-ink"
                  >
                    E-mail
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="seuemail@exemplo.com"
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3.5 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-bold text-brand-ink"
                  >
                    Motivo do contato
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3.5 text-sm text-brand-ink outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  >
                    <option value="" disabled>
                      Selecione uma opção
                    </option>

                    {contactOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-bold text-brand-ink"
                  >
                    Assunto
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    minLength={3}
                    placeholder="Resuma o motivo do contato"
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3.5 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-bold text-brand-ink"
                  >
                    Mensagem
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    rows={5}
                    placeholder="Escreva sua mensagem..."
                    className="w-full resize-none rounded-xl border border-brand-border bg-brand-background px-4 py-3.5 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  />
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-brand-background p-4">
                  <LockKeyhole
                    size={18}
                    className="mt-0.5 shrink-0 text-brand-primary"
                  />

                  <p className="text-xs leading-5 text-brand-muted">
                    Não informe senhas, documentos ou dados de saúde
                    desnecessários neste formulário.
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-dark"
                >
                  Validar preenchimento
                  <Send size={17} />
                </button>

                {feedback && (
                  <p
                    role="status"
                    className="rounded-xl bg-brand-pink-light px-4 py-3 text-sm leading-6 text-brand-primary"
                  >
                    {feedback}
                  </p>
                )}

                <p className="text-center text-xs leading-5 text-brand-muted">
                  O formulário ainda não está conectado a um serviço
                  de envio de mensagens. Nenhuma mensagem é enviada
                  neste momento.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 lg:px-10 lg:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl border border-brand-border bg-white p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
              <CircleHelp size={22} />
            </div>

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              Ainda tem alguma dúvida?
            </h2>

            <p className="mt-3 text-sm leading-7 text-brand-muted sm:text-base">
              Confira as perguntas frequentes para encontrar mais
              informações sobre a plataforma, seus recursos e a proposta
              do Cuidar+.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark"
            >
              Acessar perguntas frequentes
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/solucao"
              className="inline-flex items-center justify-center rounded-xl border border-brand-border px-6 py-3.5 text-sm font-bold text-brand-primary transition hover:bg-brand-pink-light"
            >
              Conhecer a solução
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
