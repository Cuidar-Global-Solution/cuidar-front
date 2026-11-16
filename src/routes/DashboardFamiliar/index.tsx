
import { useState, type FormEvent } from 'react'
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
  Settings,
  ShieldCheck,
  Utensils,
  UsersRound,
  X,
  Bath,
  Pencil,
  Trash2,
} from 'lucide-react'

type TaskCategory =
  | 'Medicamentos'
  | 'Alimentação'
  | 'Hidratação'
  | 'Higiene'
  | 'Atividades'

type Task = {
  id: number
  title: string
  description: string
  time: string
  category: TaskCategory
  responsible: string
  completed: boolean
}

const categoryIcons = {
  Medicamentos: Pill,
  Alimentação: Utensils,
  Hidratação: Droplets,
  Higiene: Bath,
  Atividades: Activity,
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: 'Medicamento da manhã',
    description: 'Losartana — 1 comprimido',
    time: '08:00',
    category: 'Medicamentos',
    responsible: 'Ana Martins',
    completed: true,
  },
  {
    id: 2,
    title: 'Café da manhã',
    description: 'Refeição e acompanhamento',
    time: '08:30',
    category: 'Alimentação',
    responsible: 'João Martins',
    completed: true,
  },
  {
    id: 3,
    title: 'Hidratação',
    description: 'Oferecer um copo de água',
    time: '10:00',
    category: 'Hidratação',
    responsible: 'Renata Costa',
    completed: false,
  },
  {
    id: 4,
    title: 'Caminhada leve',
    description: 'Atividade acompanhada',
    time: '14:00',
    category: 'Atividades',
    responsible: 'Ana Martins',
    completed: false,
  },
  {
    id: 5,
    title: 'Medicamento da noite',
    description: 'Conforme orientação médica',
    time: '20:00',
    category: 'Medicamentos',
    responsible: 'Renata Costa',
    completed: false,
  },
]

const navigation = [
  { label: 'Visão geral', href: '#visao-geral', icon: LayoutDashboard },
  { label: 'Rotina de cuidados', href: '#rotina', icon: ClipboardList },
  { label: 'Agenda', href: '#agenda', icon: CalendarDays },
  { label: 'Rede de apoio', href: '#rede-de-apoio', icon: UsersRound },
]

const emptyForm = {
  title: '',
  description: '',
  time: '',
  category: 'Medicamentos' as TaskCategory,
  responsible: '',
}

export default function DashboardFamiliar() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [form, setForm] = useState(emptyForm)

  const completedTasks = tasks.filter((task) => task.completed).length
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100)

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

  function openNewTask() {
    setForm(emptyForm)
    setEditingTask(null)
    setModalOpen(true)
  }

  function openEditTask(task: Task) {
    setForm({
      title: task.title,
      description: task.description,
      time: task.time,
      category: task.category,
      responsible: task.responsible,
    })
    setEditingTask(task.id)
    setModalOpen(true)
  }

  function closeTaskModal() {
    setModalOpen(false)
    setEditingTask(null)
    setForm(emptyForm)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (editingTask !== null) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask ? { ...task, ...form } : task,
        ),
      )
    } else {
      setTasks((currentTasks) => [
        ...currentTasks,
        {
          id: Date.now(),
          ...form,
          completed: false,
        },
      ])
    }

    closeTaskModal()
  }

  function deleteTask(id: number) {
    const confirmed = window.confirm('Deseja realmente excluir esta tarefa?')

    if (!confirmed) return

    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id))
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
                  Acompanhe os cuidados de hoje e mantenha tudo organizado em
                  um só lugar.
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
                  <span className="text-lg text-brand-muted/70">
                    /{tasks.length}
                  </span>
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
                  onClick={openNewTask}
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
                {tasks.length === 0 ? (
                  <div className="py-10 text-center">
                    <ClipboardList
                      size={30}
                      className="mx-auto text-brand-muted/70"
                    />
                    <p className="mt-3 text-sm font-extrabold text-brand-dark">
                      Nenhuma tarefa cadastrada
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      Adicione uma atividade para organizar os cuidados.
                    </p>
                  </div>
                ) : (
                  tasks
                    .slice()
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((task) => {
                      const Icon = categoryIcons[task.category]

                      return (
                        <div
                          key={task.id}
                          className="flex flex-wrap items-center gap-3 py-4"
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
                              {task.description || task.category}
                            </p>
                            <p className="mt-1 text-[11px] text-brand-muted">
                              Responsável: {task.responsible}
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-brand-muted">
                              <Clock3 size={13} />
                              {task.time}
                            </span>
                            <button
                              type="button"
                              onClick={() => openEditTask(task)}
                              aria-label={`Editar ${task.title}`}
                              className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-lavender/30 hover:text-brand-primary"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTask(task.id)}
                              aria-label={`Excluir ${task.title}`}
                              className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-danger/10 hover:text-brand-danger"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      )
                    })
                )}
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
                  Uma rede de apoio organizada torna a rotina mais clara e
                  ajuda todos a participarem do cuidado.
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

      {modalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-brand-ink/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Organização dos cuidados
                </p>
                <h2
                  id="task-modal-title"
                  className="mt-1 font-heading text-xl font-bold text-brand-dark"
                >
                  {editingTask !== null ? 'Editar tarefa' : 'Nova tarefa'}
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Preencha os dados da atividade.
                </p>
              </div>
              <button
                type="button"
                onClick={closeTaskModal}
                aria-label="Fechar formulário"
                className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-background hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="task-title"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Nome da atividade
                </label>
                <input
                  id="task-title"
                  type="text"
                  required
                  maxLength={70}
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  placeholder="Ex.: Medicamento da manhã"
                  className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                />
              </div>

              <div>
                <label
                  htmlFor="task-description"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Descrição
                </label>
                <textarea
                  id="task-description"
                  rows={3}
                  maxLength={180}
                  value={form.description}
                  onChange={(event) =>
                    setForm({ ...form, description: event.target.value })
                  }
                  placeholder="Adicione detalhes sobre a atividade"
                  className="w-full resize-none rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="task-category"
                    className="mb-1.5 block text-xs font-bold text-brand-dark"
                  >
                    Categoria
                  </label>
                  <select
                    id="task-category"
                    value={form.category}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        category: event.target.value as TaskCategory,
                      })
                    }
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                  >
                    {Object.keys(categoryIcons).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="task-time"
                    className="mb-1.5 block text-xs font-bold text-brand-dark"
                  >
                    Horário
                  </label>
                  <input
                    id="task-time"
                    type="time"
                    required
                    value={form.time}
                    onChange={(event) =>
                      setForm({ ...form, time: event.target.value })
                    }
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="task-responsible"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Responsável
                </label>
                <select
                  id="task-responsible"
                  required
                  value={form.responsible}
                  onChange={(event) =>
                    setForm({ ...form, responsible: event.target.value })
                  }
                  className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                >
                  <option value="">Selecione uma pessoa</option>
                  <option value="Ana Martins">Ana Martins</option>
                  <option value="João Martins">João Martins</option>
                  <option value="Renata Costa">Renata Costa</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeTaskModal}
                  className="rounded-xl border border-brand-border px-5 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-background"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark"
                >
                  <Check size={17} />
                  {editingTask !== null ? 'Salvar alterações' : 'Adicionar tarefa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
