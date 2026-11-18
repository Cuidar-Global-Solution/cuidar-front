
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  ClipboardList,
  Clock,
  Compass,
  Eye,
  HandHeart,
  Heart,
  HeartHandshake,
  LockKeyhole,
  ShieldCheck,
  Target,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Sobre() {
  return (
    <div className="bg-brand-background">
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
            Sobre o Cuidar+
          </span>

          <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Cuidar de quem importa merece atenção em cada detalhe.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-brand-muted sm:text-lg">
            O Cuidar+ é uma proposta de plataforma digital criada para
            facilitar a organização dos cuidados com pessoas idosas,
            aproximando familiares e cuidadores profissionais em uma rede
            de apoio mais conectada.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-brand-dark p-8 text-white sm:p-10">
            <HeartHandshake size={34} className="text-brand-lavender" />

            <h2 className="mt-6 text-2xl font-semibold text-white">
              Cuidado compartilhado
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/75">
              Acreditamos que o cuidado se torna mais organizado quando
              familiares e profissionais conseguem acompanhar as informações
              importantes e participar da rotina de maneira coordenada.
            </p>
          </div>

          <div className="flex flex-col justify-center rounded-3xl border border-brand-border bg-white p-8 sm:p-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-pink">
              Nossa proposta
            </span>

            <h2 className="mt-4 text-2xl font-semibold">
              Mais organização para quem cuida. Mais atenção para quem recebe cuidado.
            </h2>

            <p className="mt-4 text-sm leading-7 text-brand-muted">
              Reunimos, em uma única proposta, recursos para organizar
              atividades diárias, acompanhar compromissos e facilitar
              a conexão entre as pessoas envolvidas no cuidado.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              Por que existimos
            </span>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              O cuidado ainda enfrenta desafios que não podem ser ignorados.
            </h2>

            <p className="mt-5 leading-8 text-brand-muted">
              O envelhecimento da população traz novas necessidades para
              famílias, profissionais e para toda a sociedade. Na rotina,
              muitas dessas necessidades acabam sendo resolvidas de forma
              improvisada, com informações espalhadas e pouca integração.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-brand-border p-7">
              <ClipboardList size={28} className="text-brand-primary" />

              <h3 className="mt-5 text-xl font-semibold">
                Informações dispersas
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                Medicamentos, consultas, orientações e compromissos podem
                ficar distribuídos entre mensagens, anotações e diferentes
                pessoas.
              </p>
            </article>

            <article className="rounded-2xl border border-brand-border p-7">
              <Clock size={28} className="text-brand-primary" />

              <h3 className="mt-5 text-xl font-semibold">
                Rotina exigente
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                Conciliar trabalho, responsabilidades familiares e cuidados
                diários exige tempo, atenção e organização constante.
              </p>
            </article>

            <article className="rounded-2xl border border-brand-border p-7">
              <Users size={28} className="text-brand-primary" />

              <h3 className="mt-5 text-xl font-semibold">
                Falta de integração
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                Familiares e cuidadores podem ter dificuldades para manter
                uma comunicação clara e acompanhar as mesmas informações.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
            Nossa identidade
          </span>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Uma ideia construída a partir de uma necessidade real.
          </h2>

          <p className="mt-5 leading-8 text-brand-muted">
            O Cuidar+ nasceu da percepção de que cuidar de uma pessoa idosa
            envolve muito mais do que acompanhar tarefas. É preciso organizar
            informações, dividir responsabilidades e garantir que as pessoas
            envolvidas tenham condições de participar desse processo.
          </p>

          <p className="mt-4 leading-8 text-brand-muted">
            A proposta é utilizar a tecnologia como uma ferramenta de apoio,
            aproximando pessoas e tornando a rotina de cuidados mais clara,
            acessível e organizada.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl bg-white p-7 shadow-sm">
            <Target size={30} className="text-brand-primary" />

            <h3 className="mt-5 text-xl font-semibold">Missão</h3>

            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Facilitar a organização dos cuidados com pessoas idosas,
              conectando familiares e cuidadores por meio de recursos
              digitais acessíveis e funcionais.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-7 shadow-sm">
            <Eye size={30} className="text-brand-primary" />

            <h3 className="mt-5 text-xl font-semibold">Visão</h3>

            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Contribuir para uma realidade em que o cuidado seja mais
              integrado, organizado e respeitoso com as necessidades
              de cada pessoa idosa.
            </p>
          </article>

          <article className="rounded-2xl bg-white p-7 shadow-sm">
            <Compass size={30} className="text-brand-primary" />

            <h3 className="mt-5 text-xl font-semibold">Propósito</h3>

            <p className="mt-3 text-sm leading-7 text-brand-muted">
              Aproximar quem cuida e quem recebe cuidado, valorizando
              a autonomia, a dignidade e a participação de todos.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              Como pensamos o cuidado
            </span>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Três pilares orientam a proposta do Cuidar+.
            </h2>

            <p className="mt-5 leading-8 text-brand-muted">
              Cada recurso pensado para a plataforma parte de uma necessidade
              da rotina de cuidados. Nosso objetivo é reunir essas necessidades
              em uma experiência simples, útil e integrada.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-brand-border p-7">
              <CalendarCheck size={30} className="text-brand-primary" />

              <h3 className="mt-5 text-xl font-semibold">
                Gestão do cuidado
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                Organização da rotina, medicamentos, consultas e informações
                importantes para facilitar o acompanhamento das atividades
                diárias.
              </p>
            </article>

            <article className="rounded-2xl border border-brand-border p-7">
              <Users size={30} className="text-brand-primary" />

              <h3 className="mt-5 text-xl font-semibold">
                Rede de apoio
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                Aproximação entre familiares e cuidadores profissionais,
                incentivando a comunicação e o compartilhamento responsável
                das informações.
              </p>
            </article>

            <article className="rounded-2xl border border-brand-border p-7">
              <ShieldCheck size={30} className="text-brand-primary" />

              <h3 className="mt-5 text-xl font-semibold">
                Segurança e autonomia
              </h3>

              <p className="mt-3 text-sm leading-7 text-brand-muted">
                Valorização da dignidade, da privacidade e da participação
                da pessoa idosa nas decisões relacionadas ao próprio cuidado.
              </p>
            </article>
          </div>
        </div>
      </section>

  <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
            Nossos princípios
          </span>

          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            Tecnologia que respeita as pessoas.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="flex gap-4">
            <Accessibility size={27} className="shrink-0 text-brand-primary" />

            <div>
              <h3 className="font-semibold">Acessibilidade</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                Uma experiência simples e compreensível para diferentes
                pessoas e níveis de familiaridade com a tecnologia.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <LockKeyhole size={27} className="shrink-0 text-brand-primary" />

            <div>
              <h3 className="font-semibold">Privacidade</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                Respeito às informações pessoais e cuidado com o acesso
                aos dados compartilhados na plataforma.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Heart size={27} className="shrink-0 text-brand-primary" />

            <div>
              <h3 className="font-semibold">Autonomia</h3>
              <p className="mt-2 text-sm leading-7 text-brand-muted">
                Reconhecimento da pessoa idosa como participante das decisões
                sobre sua rotina e suas necessidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-border bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              Impacto social
            </span>

            <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
              Um cuidado melhor também contribui para uma sociedade melhor.
            </h2>

            <p className="mt-5 leading-8 text-brand-muted">
              O Cuidar+ está alinhado a iniciativas globais que buscam
              promover qualidade de vida, inclusão e dignidade. Acreditamos
              que a tecnologia pode ajudar a enfrentar desafios sociais
              quando é desenvolvida a partir das necessidades das pessoas.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <article className="flex flex-col rounded-3xl bg-brand-dark p-8 text-white sm:p-10">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-lavender">
                ODS 3
              </span>

              <h3 className="mt-5 text-2xl font-semibold text-white">
                Saúde e bem-estar
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-white/75">
                Ao facilitar a organização de rotinas, medicamentos e
                compromissos, o projeto busca contribuir para um
                acompanhamento mais atento e organizado das necessidades
                da pessoa idosa.
              </p>

              <a
                href="https://brasil.un.org/pt-br/sdgs/3"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-lavender transition hover:text-white"
              >
                Conhecer o ODS 3
                <ArrowUpRight size={16} />
              </a>
            </article>

            <article className="flex flex-col rounded-3xl border border-brand-border bg-brand-background p-8 sm:p-10">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-pink">
                ODS 10
              </span>

              <h3 className="mt-5 text-2xl font-semibold">
                Redução das desigualdades
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-brand-muted">
                A proposta busca aproximar pessoas e facilitar o acesso
                à organização do cuidado, considerando diferentes realidades
                familiares e necessidades de apoio.
              </p>

              <a
                href="https://brasil.un.org/pt-br/sdgs/10"
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition hover:text-brand-pink"
              >
                Conhecer o ODS 10
                <ArrowUpRight size={16} />
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
        <div className="overflow-hidden rounded-3xl bg-brand-dark px-8 py-12 text-center sm:px-14 sm:py-16">
          <HandHeart size={38} className="mx-auto text-brand-lavender" />

          <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            Cuidar é uma responsabilidade compartilhada.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
            Conheça a proposta do Cuidar+ e descubra como a tecnologia
            pode ajudar a tornar a rotina de cuidados mais organizada,
            próxima e humana.
          </p>

          <Link
            to="/solucao"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand-pink px-7 py-3.5 text-sm font-bold text-white transition hover:bg-brand-light"
          >
            Conheça nossa solução
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  )
}
