
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Início', to: '/' },
  { label: 'Sobre nós', to: '/sobre' },
  { label: 'Como funciona', to: '/solucao' },
  { label: 'Contato', to: '/contato' },
  { label: 'FAQ', to: '/faq' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        <Link
          to="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <img
            src="/assets/logo-cuidar.jpeg"
            alt="Cuidar+"
            className="h-12 w-12 rounded-xl object-cover"
          />

          <div className="leading-tight">
            <span className="block text-xl font-extrabold text-brand-dark">
              Cuidar<span className="text-brand-pink">+</span>
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-brand-muted">
              CUIDADO QUE CONECTA
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `text-sm font-bold transition-colors ${
                  isActive
                    ? 'text-brand-primary'
                    : 'text-brand-muted hover:text-brand-primary'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-5 py-3 text-sm font-bold text-brand-primary transition hover:bg-brand-pink-light"
          >
            Entrar
          </Link>

          <Link
            to="/cadastro"
            className="rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-md shadow-purple-200 transition hover:bg-brand-dark"
          >
            Criar conta
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 text-brand-dark transition hover:bg-brand-pink-light md:hidden"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-border bg-white px-5 py-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-bold transition ${
                    isActive
                      ? 'bg-brand-pink-light text-brand-primary'
                      : 'text-brand-muted hover:bg-brand-background'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-3 border-t border-brand-border pt-4">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl border border-brand-border py-3 text-center text-sm font-bold text-brand-primary"
            >
              Entrar
            </Link>

            <Link
              to="/cadastro"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-brand-primary py-3 text-center text-sm font-bold text-white"
            >
              Criar conta
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
