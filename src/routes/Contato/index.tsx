
import {
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react'

export default function Contato() {
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
              Tem alguma dúvida, sugestão ou quer conhecer melhor o
              Cuidar+? Este é o espaço para conversar com a nossa equipe.
            </p>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Vamos conversar?
                </h2>

                <p className="mt-3 text-base leading-7 text-brand-muted">
                  Queremos entender suas necessidades e conhecer suas
                  ideias para tornar a experiência de cuidado mais simples
                  e organizada.
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                  <Mail size={22} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Fale com a equipe
                </h3>

                <p className="mt-2 text-sm leading-7 text-brand-muted">
                  Utilize o formulário ao lado para compartilhar sua
                  mensagem, dúvida ou sugestão.
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

              <form className="space-y-5">
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
                    placeholder="seuemail@exemplo.com"
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3.5 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  />
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
                    placeholder="Sobre o que deseja conversar?"
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
                    rows={5}
                    placeholder="Escreva sua mensagem..."
                    className="w-full resize-y rounded-xl border border-brand-border bg-brand-background px-4 py-3.5 text-sm outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10"
                  />
                </div>

                <button
                  type="button"
                  disabled
                  className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-4 text-sm font-bold text-white opacity-70"
                >
                  Enviar mensagem
                  <Send size={17} />
                </button>

                <p className="text-center text-xs leading-5 text-brand-muted">
                  O envio será habilitado após a integração do formulário
                  com o serviço responsável pelas mensagens.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
