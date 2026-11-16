
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Activity,
  ArrowRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Clock3,
  Droplets,
  Heart,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Utensils,
  UsersRound,
  X,
} from 'lucide-react'

type Task = {
  id: number
  title: string
  description: string
  time: string
  icon: typeof Pill
  completed: boolean
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Medicamento da manhã',
    description: 'Losartana — 1 comprimido',
    time: '08:00',
    icon: Pill,
    completed: true,
  },
  {
    id: 2,
    title: 'Café da manhã',
    description: 'Refeição e acompanhamento',
    time: '08:30',
    icon: Utensils,
    completed: true,
  },
  {
    id: 3,
    title: 'Hidratação',
    description: 'Oferecer um copo de água',
    time: '10:00',
    icon: Droplets,
    completed: false,
  },
  {
    id: 4,
    title: 'Caminhada leve',
    description: 'Atividade acompanhada',
    time: '14:00',
    icon: Activity,
    completed: false,
  },
  {
    id: 5,
    title: 'Medicamento da noite',
    description: 'Conforme orientação médica',
    time: '20:00',
    icon: Pill,
    completed: false,
  },
]

const navigation = [
  { label: 'Visão geral', href: '#visao-geral', icon: LayoutDashboard },
  { label: 'Rotina de cuidados', href: '#rotina', icon: ClipboardList },
  { label: 'Agenda', href: '#agenda', icon: CalendarDays },
  { label: 'Rede de apoio', href: '#rede-de-apoio', icon: UsersRound },
]

export default function DashboardFamiliar() {
  const [tasks, setTasks] = useState(initialTasks)
  const [menuOpen, setMenuOpen] = useState(false)

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress = Math.round((completedTasks / tasks.length) * 100)

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-brand-background text-brand-ink">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-67.5 flex-col border-r border-brand-border bg-brand-surface transition-transform duration-300 lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-brand-border px-7">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/img01-logo-cuidar.jpeg"
              alt="Cuidar+"
              className="h-11 w-11 rounded-xl object-cover"
            />
            <span className="font-heading text-xl font-bold text-brand-dark">
              cuidar<span className="text-brand-pink">+</span>
            </span>
          </Link>

          <button
            type="button"
            onClick={closeMenu}
            className="rounded-lg p-2 text-brand-muted hover:bg-brand-pink-light lg:hidden"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-5 pt-7">
          <p className="mb-3 px-3 text-[10px] font-extrabold uppercase tracking-[0.16em] text-brand-muted/70">
            Menu principal
          </p>

          <nav className="space-y-1">
            {navigation.map((item, index) => {
              const Icon = item.icon

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                    index === 0
                      ? 'bg-brand-lavender/30 text-brand-primary'
                      : 'text-brand-muted hover:bg-brand-background hover:text-brand-primary'
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto px-5 pb-6">
          <div className="rounded-2xl bg-brand-background p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light/20 text-brand-primary">
              <CircleHelp size={19} />
            </div>
            <p className="text-sm font-extrabold text-brand-dark">
              Precisa de ajuda?
            </p>
            <p className="mt-1 text-xs leading-relaxed text-brand-muted">
              Consulte nossas orientações sobre o uso da plataforma.
            </p>
            <Link
              to="/faq"
              className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold text-brand-primary hover:text-brand-pink"
            >
              Acessar ajuda <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-brand-border pt-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-lavender/30 text-sm font-extrabold text-brand-primary">
              AM
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold">Ana Martins</p>
              <p className="text-xs text-brand-muted">Familiar</p>
            </div>
            <button
              type="button"
              aria-label="Configurações"
              className="rounded-lg p-2 text-brand-muted hover:bg-brand-lavender/30 hover:text-brand-primary"
            >
              <Settings size={18} />
            </button>
          </div>

          <Link
            to="/login"
            className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-brand-muted transition hover:bg-brand-danger/10 hover:text-brand-danger"
          >
            <LogOut size={18} />
            Sair da conta
          </Link>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-brand-ink/30 lg:hidden"
        />
      )}

      <main className="min-h-screen lg:ml-67.5">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-brand-border bg-brand-surface/95 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="rounded-xl p-2 text-brand-primary hover:bg-brand-lavender/30 lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs font-semibold text-brand-muted/70">
                Área do familiar
              </p>
              <p className="text-sm font-extrabold text-brand-dark">
                Visão geral
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Pesquisar"
              className="hidden rounded-xl border border-brand-border p-2.5 text-brand-muted transition hover:bg-brand-background sm:block"
            >
              <Search size={18} />
            </button>

            <button
              type="button"
              aria-label="Notificações"
              className="relative rounded-xl border border-brand-border p-2.5 text-brand-muted transition hover:bg-brand-background"
            >
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-pink" />
            </button>

            <div className="hidden h-9 w-px bg-brand-border sm:block" />

            <div className="hidden items-center gap-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lavender/30 text-xs font-extrabold text-brand-primary">
                AM
              </div>
              <div>
                <p className="text-xs font-extrabold">Ana Martins</p>
                <p className="text-[10px] text-brand-muted">Familiar</p>
              </div>
              <ChevronDown size={15} className="text-brand-muted" />
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-375 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <section id="visao-geral" className="scroll-mt-28">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-bold text-brand-pink">
                  Segunda-feira, 16 de novembro
                </p>
                <h1 className="mt-2 font-heading text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl">
                  Bom dia, Ana!
                </h1>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-brand-muted">
                  Acompanhe os cuidados de hoje e mantenha tudo organizado em um só lugar.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-border bg-brand-surface px-3 py-2 text-xs font-bold text-brand-muted">
                <ShieldCheck size={15} className="text-brand-primary" />
                Ambiente de demonstração
              </span>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-brand-border bg-brand-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-muted">
                    Tarefas de hoje
                  </span>
                  <span className="rounded-xl bg-brand-lavender/30 p-2 text-brand-primary">
                    <ClipboardList size={19} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold text-brand-dark">
                  {completedTasks}
                  <span className="text-lg text-brand-muted/70">/{tasks.length}</span>
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Tarefas concluídas
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-muted">
                    Próximo compromisso
                  </span>
                  <span className="rounded-xl bg-brand-pink-light p-2 text-brand-pink">
                    <CalendarDays size={19} />
                  </span>
                </div>
                <p className="mt-4 text-2xl font-extrabold text-brand-dark">
                  18 nov.
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Consulta médica · 09:30
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-muted">
                    Pessoa assistida
                  </span>
                  <span className="rounded-xl bg-brand-lavender/30 p-2 text-brand-primary">
                    <HeartPulse size={19} />
                  </span>
                </div>
                <p className="mt-4 text-2xl font-extrabold text-brand-dark">
                  Helena
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Perfil de demonstração
                </p>
              </div>

              <div className="rounded-2xl border border-brand-border bg-brand-surface p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-muted">
                    Rede de apoio
                  </span>
                  <span className="rounded-xl bg-brand-pink-light p-2 text-brand-pink">
                    <UsersRound size={19} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold text-brand-dark">
                  3
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Pessoas vinculadas
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 grid gap-6 xl:grid-cols-[1.55fr_1fr]">
            <div
              id="rotina"
              className="scroll-mt-28 rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-7"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                    Acompanhamento diário
                  </p>
                  <h2 className="mt-1 font-heading text-xl font-bold text-brand-dark">
                    Rotina de cuidados
                  </h2>
                  <p className="mt-1 text-xs text-brand-muted">
                    Atividades previstas para hoje
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-dark"
                >
                  <Plus size={16} />
                  Adicionar tarefa
                </button>
              </div>

              <div className="mt-6 rounded-xl bg-brand-background p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold text-brand-dark">
                      Progresso do dia
                    </p>
                    <p className="mt-1 text-[11px] text-brand-muted">
                      {completedTasks} de {tasks.length} atividades concluídas
                    </p>
                  </div>
                  <span className="text-sm font-extrabold text-brand-primary">
                    {progress}%
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-brand-border">
                  <div
                    className="h-full rounded-full bg-brand-light transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 divide-y divide-brand-border">
                {tasks.map((task) => {
                  const Icon = task.icon

                  return (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 py-4"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        aria-label={
                          task.completed
                            ? `Desmarcar ${task.title}`
                            : `Marcar ${task.title} como concluída`
                        }
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
                          task.completed
                            ? 'border-brand-primary bg-brand-primary text-white'
                            : 'border-brand-border bg-brand-surface text-transparent hover:border-brand-primary'
                        }`}
                      >
                        <Check size={14} />
                      </button>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          task.completed
                            ? 'bg-brand-lavender/30 text-brand-muted/70'
                            : 'bg-brand-pink-light text-brand-pink'
                        }`}
                      >
                        <Icon size={18} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-extrabold ${
                            task.completed
                              ? 'text-brand-muted/70 line-through'
                              : 'text-brand-dark'
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs text-brand-muted">
                          {task.description}
                        </p>
                      </div>

                      <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-brand-muted">
                        <Clock3 size={13} />
                        {task.time}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div
                id="agenda"
                className="scroll-mt-28 rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                      Fique atento
                    </p>
                    <h2 className="mt-1 font-heading text-lg font-bold text-brand-dark">
                      Próximos compromissos
                    </h2>
                  </div>
                  <CalendarDays size={21} className="text-brand-primary" />
                </div>

                <div className="mt-5 flex gap-4 rounded-xl border border-brand-border p-4">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-lavender/30 text-brand-primary">
                    <span className="text-[10px] font-extrabold uppercase">
                      Nov
                    </span>
                    <span className="text-xl font-extrabold">18</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-brand-dark">
                      Consulta médica
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      Acompanhamento de rotina
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-brand-primary">
                      <Clock3 size={13} /> 09:30
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex gap-4 rounded-xl border border-brand-border p-4">
                  <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-brand-pink-light text-brand-pink">
                    <span className="text-[10px] font-extrabold uppercase">
                      Nov
                    </span>
                    <span className="text-xl font-extrabold">21</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-extrabold text-brand-dark">
                      Exame de rotina
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      Laboratório
                    </p>
                    <p className="mt-2 flex items-center gap-1 text-xs font-bold text-brand-primary">
                      <Clock3 size={13} /> 08:00
                    </p>
                  </div>
                </div>

                <a
                  href="#agenda"
                  className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-brand-primary hover:text-brand-pink"
                >
                  Ver agenda completa <ArrowRight size={14} />
                </a>
              </div>

              <div
                id="rede-de-apoio"
                className="scroll-mt-28 rounded-2xl border border-brand-border bg-brand-surface p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                      Cuidado compartilhado
                    </p>
                    <h2 className="mt-1 font-heading text-lg font-bold text-brand-dark">
                      Rede de apoio
                    </h2>
                  </div>
                  <UsersRound size={21} className="text-brand-primary" />
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-lavender/30 text-xs font-extrabold text-brand-primary">
                      AM
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-brand-dark">
                        Ana Martins
                      </p>
                      <p className="text-xs text-brand-muted">Familiar</p>
                    </div>
                    <span className="rounded-full bg-brand-lavender/30 px-2.5 py-1 text-[10px] font-bold text-brand-primary">
                      Você
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pink-light text-xs font-extrabold text-brand-pink">
                      JM
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-brand-dark">
                        João Martins
                      </p>
                      <p className="text-xs text-brand-muted">Familiar</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-lavender/30 text-xs font-extrabold text-brand-primary">
                      RC
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-brand-dark">
                        Renata Costa
                      </p>
                      <p className="text-xs text-brand-muted">Cuidadora</p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border px-4 py-3 text-xs font-extrabold text-brand-primary transition hover:bg-brand-background"
                >
                  <Plus size={15} />
                  Convidar pessoa
                </button>
              </div>
            </div>
          </section>

          <section className="mt-6 rounded-2xl bg-brand-dark p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="max-w-xl">
                <div className="flex items-center gap-2 text-brand-lavender">
                  <Heart size={16} />
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    Cuidar+
                  </span>
                </div>
                <h2 className="mt-3 font-heading text-xl font-bold sm:text-2xl">
                  Cuidar também é compartilhar.
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  Uma rede de apoio organizada torna a rotina mais clara e ajuda todos a participarem do cuidado.
                </p>
              </div>
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-lavender">
                <HeartPulse size={29} />
              </div>
            </div>
          </section>

          <footer className="py-7 text-center text-xs text-brand-muted/70">
            Cuidar+ · Organização e apoio para quem cuida.
          </footer>
        </div>
      </main>
    </div>
  )
}
