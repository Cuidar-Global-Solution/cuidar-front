
import { Link } from 'react-router-dom'
import { Heart, ArrowUpRight } from 'lucide-react'

const navigation = [
  { label: 'Início', to: '/' },
  { label: 'Sobre nós', to: '/sobre' },
  { label: 'Como funciona', to: '/solucao' },
  { label: 'Perguntas frequentes', to: '/faq' },
]

const services = [
  { label: 'Encontrar cuidadores', to: '/cuidadores' },
  { label: 'Criar uma conta', to: '/cadastro' },
  { label: 'Entrar', to: '/login' },
  { label: 'Fale conosco', to: '/contato' },
]

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-16 sm:px-8 lg:px-10">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="/assets/img01-logo-cuidar.jpeg"
                alt="Cuidar+"
                className="h-12 w-12 rounded-xl object-cover"
              />
              <span className="text-2xl font-bold tracking-tight">
                Cuidar<span className="text-brand-pink">+</span>
              </span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-white/70">
              Cuidado que conecta pessoas, famílias e profissionais para
              tornar a rotina de quem precisa de atenção mais organizada
              e acolhedora.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-white/80">
              Feito para cuidar de quem importa
              <Heart size={16} className="text-brand-pink" />
            </div>
          </div>

          <div>
            <h3 className=" text-sm font-bold uppercase tracking-wider">
              Navegação
            </h3>
            <ul className="mt-5 space-y-4">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-white/70 transition hover:text-brand-pink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider ">
              Cuidar+
            </h3>
            <ul className="mt-5 space-y-4">
              {services.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1 text-sm text-white/70 transition hover:text-brand-pink"
                  >
                    {item.label}
                    <ArrowUpRight size={13} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {currentYear} Cuidar+. Todos os direitos reservados.
          </p>

          <p className="text-xs text-white/50">
            Cuidado que conecta.
          </p>
        </div>
      </div>
    </footer>
  )
}
