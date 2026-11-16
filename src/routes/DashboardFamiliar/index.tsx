
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
  MapPin,
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
  Mail,
  UserPlus,
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

type AppointmentCategory = 'Consulta' | 'Exame' | 'Outro'

type Appointment = {
  id: number
  title: string
  description: string
  category: AppointmentCategory
  date: string
  time: string
  location: string
  responsible: string
  completed: boolean
}

type SupportMember = {
  id: number
  name: string
  email: string
  role: 'Familiar' | 'Cuidador'
  status: 'Ativo' | 'Convite enviado'
  owner?: boolean
}

type TaskFilter = 'Todas' | 'Pendentes' | 'Concluídas'
type AppointmentFilter = 'Todos' | 'Pendentes' | 'Concluídos'

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

const initialAppointments: Appointment[] = [
  {
    id: 1,
    title: 'Consulta médica',
    description: 'Acompanhamento de rotina',
    category: 'Consulta',
    date: '2026-11-18',
    time: '09:30',
    location: 'Clínica Central',
    responsible: 'Ana Martins',
    completed: false,
  },
  {
    id: 2,
    title: 'Exame de rotina',
    description: 'Exames solicitados pelo médico',
    category: 'Exame',
    date: '2026-11-21',
    time: '08:00',
    location: 'Laboratório',
    responsible: 'João Martins',
    completed: false,
  },
]

const initialMembers: SupportMember[] = [
  {
    id: 1,
    name: 'Ana Martins',
    email: 'ana@email.com',
    role: 'Familiar',
    status: 'Ativo',
    owner: true,
  },
  {
    id: 2,
    name: 'João Martins',
    email: 'joao@email.com',
    role: 'Familiar',
    status: 'Ativo',
  },
  {
    id: 3,
    name: 'Renata Costa',
    email: 'renata@email.com',
    role: 'Cuidador',
    status: 'Ativo',
  },
]

const navigation = [
  { label: 'Visão geral', href: '#visao-geral', icon: LayoutDashboard },
  { label: 'Rotina de cuidados', href: '#rotina', icon: ClipboardList },
  { label: 'Agenda', href: '#agenda', icon: CalendarDays },
  { label: 'Rede de apoio', href: '#rede-de-apoio', icon: UsersRound },
]

const emptyTaskForm = {
  title: '',
  description: '',
  time: '',
  category: 'Medicamentos' as TaskCategory,
  responsible: '',
}

const emptyAppointmentForm = {
  title: '',
  description: '',
  category: 'Consulta' as AppointmentCategory,
  date: '',
  time: '',
  location: '',
  responsible: '',
}

const emptyMemberForm = {
  name: '',
  email: '',
  role: 'Familiar' as SupportMember['role'],
}

function getDateParts(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  const parsedDate = new Date(year, month - 1, day)

  return {
    day: parsedDate.toLocaleDateString('pt-BR', { day: '2-digit' }),
    month: parsedDate
      .toLocaleDateString('pt-BR', { month: 'short' })
      .replace('.', ''),
  }
}

function getFormattedDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function DashboardFamiliar() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments)
  const [members, setMembers] = useState<SupportMember[]>(initialMembers)
  const [menuOpen, setMenuOpen] = useState(false)
  const [taskModalOpen, setTaskModalOpen] = useState(false)
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false)
  const [supportModalOpen, setSupportModalOpen] = useState(false)
  const [memberFormOpen, setMemberFormOpen] = useState(false)
  const [taskManagerOpen, setTaskManagerOpen] = useState(false)
  const [appointmentManagerOpen, setAppointmentManagerOpen] = useState(false)
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('Todas')
  const [appointmentFilter, setAppointmentFilter] =
    useState<AppointmentFilter>('Todos')
  const [editingTask, setEditingTask] = useState<number | null>(null)
  const [editingAppointment, setEditingAppointment] = useState<number | null>(
    null,
  )
  const [taskForm, setTaskForm] = useState(emptyTaskForm)
  const [appointmentForm, setAppointmentForm] = useState(
    emptyAppointmentForm,
  )
  const [memberForm, setMemberForm] = useState(emptyMemberForm)
  const [memberError, setMemberError] = useState('')

  const completedTasks = tasks.filter((task) => task.completed).length
  const pendingTasks = tasks.length - completedTasks
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100)

  const sortedAppointments = appointments
    .slice()
    .sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`),
    )

  const completedAppointments = appointments.filter(
    (appointment) => appointment.completed,
  ).length

  const pendingAppointments = appointments.length - completedAppointments

  const nextAppointment = sortedAppointments.find(
    (appointment) =>
      !appointment.completed &&
      new Date(
        `${appointment.date}T${appointment.time}:00`,
      ).getTime() >= Date.now(),
  )

  const responsibleOptions = members.map((member) => member.name)

  const filteredTasks = tasks
    .filter((task) => {
      if (taskFilter === 'Pendentes') return !task.completed
      if (taskFilter === 'Concluídas') return task.completed
      return true
    })
    .slice()
    .sort((a, b) => a.time.localeCompare(b.time))

  const filteredAppointments = sortedAppointments.filter((appointment) => {
    if (appointmentFilter === 'Pendentes') return !appointment.completed
    if (appointmentFilter === 'Concluídos') return appointment.completed
    return true
  })

  function toggleTask(id: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function toggleAppointment(id: number) {
    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, completed: !appointment.completed }
          : appointment,
      ),
    )
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  function openTaskManager() {
    setTaskManagerOpen(true)
    setTaskFilter('Todas')
    closeMenu()
  }

  function closeTaskManager() {
    setTaskManagerOpen(false)
    setTaskFilter('Todas')
  }

  function openAppointmentManager() {
    setAppointmentManagerOpen(true)
    setAppointmentFilter('Todos')
    closeMenu()
  }

  function closeAppointmentManager() {
    setAppointmentManagerOpen(false)
    setAppointmentFilter('Todos')
  }

  function openSupportModal() {
    setMemberFormOpen(false)
    setMemberForm(emptyMemberForm)
    setMemberError('')
    setSupportModalOpen(true)
    closeMenu()
  }

  function closeSupportModal() {
    setSupportModalOpen(false)
    setMemberFormOpen(false)
    setMemberForm(emptyMemberForm)
    setMemberError('')
  }

  function openMemberForm() {
    setMemberForm(emptyMemberForm)
    setMemberError('')
    setMemberFormOpen(true)
  }

  function handleMemberSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const normalizedEmail = memberForm.email.trim().toLowerCase()
    const normalizedName = memberForm.name.trim()

    if (
      members.some(
        (member) => member.email.toLowerCase() === normalizedEmail,
      )
    ) {
      setMemberError('Este e-mail já está cadastrado na rede de apoio.')
      return
    }

    if (
      members.some(
        (member) => member.name.toLowerCase() === normalizedName.toLowerCase(),
      )
    ) {
      setMemberError('Esta pessoa já está cadastrada na rede de apoio.')
      return
    }

    setMembers((currentMembers) => [
      ...currentMembers,
      {
        id: Date.now(),
        name: normalizedName,
        email: normalizedEmail,
        role: memberForm.role,
        status: 'Convite enviado',
      },
    ])

    setMemberForm(emptyMemberForm)
    setMemberFormOpen(false)
    setMemberError('')
  }

  function deleteMember(member: SupportMember) {
    if (member.owner) return

    const confirmed = window.confirm(
      `Deseja realmente remover ${member.name} da rede de apoio?`,
    )

    if (!confirmed) return

    setMembers((currentMembers) =>
      currentMembers.filter((person) => person.id !== member.id),
    )

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.responsible === member.name
          ? { ...task, responsible: 'Não definido' }
          : task,
      ),
    )

    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.responsible === member.name
          ? { ...appointment, responsible: 'Não definido' }
          : appointment,
      ),
    )
  }

  function openNewTask() {
    setTaskForm({
      ...emptyTaskForm,
      responsible: responsibleOptions[0] ?? '',
    })
    setEditingTask(null)
    setTaskModalOpen(true)
  }

  function openEditTask(task: Task) {
    setTaskForm({
      title: task.title,
      description: task.description,
      time: task.time,
      category: task.category,
      responsible: task.responsible,
    })
    setEditingTask(task.id)
    setTaskModalOpen(true)
  }

  function closeTaskModal() {
    setTaskModalOpen(false)
    setEditingTask(null)
    setTaskForm(emptyTaskForm)
  }

  function handleTaskSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (editingTask !== null) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask ? { ...task, ...taskForm } : task,
        ),
      )
    } else {
      setTasks((currentTasks) => [
        ...currentTasks,
        {
          id: Date.now(),
          ...taskForm,
          completed: false,
        },
      ])
    }

    closeTaskModal()
  }

  function deleteTask(id: number) {
    const confirmed = window.confirm(
      'Deseja realmente excluir esta tarefa?',
    )

    if (!confirmed) return

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id),
    )
  }

  function openNewAppointment() {
    setAppointmentForm({
      ...emptyAppointmentForm,
      responsible: responsibleOptions[0] ?? '',
    })
    setEditingAppointment(null)
    setAppointmentModalOpen(true)
  }

  function openEditAppointment(appointment: Appointment) {
    setAppointmentForm({
      title: appointment.title,
      description: appointment.description,
      category: appointment.category,
      date: appointment.date,
      time: appointment.time,
      location: appointment.location,
      responsible: appointment.responsible,
    })
    setEditingAppointment(appointment.id)
    setAppointmentModalOpen(true)
  }

  function closeAppointmentModal() {
    setAppointmentModalOpen(false)
    setEditingAppointment(null)
    setAppointmentForm(emptyAppointmentForm)
  }

  function handleAppointmentSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (editingAppointment !== null) {
      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === editingAppointment
            ? { ...appointment, ...appointmentForm }
            : appointment,
        ),
      )
    } else {
      setAppointments((currentAppointments) => [
        ...currentAppointments,
        {
          id: Date.now(),
          ...appointmentForm,
          completed: false,
        },
      ])
    }

    closeAppointmentModal()
  }

  function deleteAppointment(id: number) {
    const confirmed = window.confirm(
      'Deseja realmente excluir este compromisso?',
    )

    if (!confirmed) return

    setAppointments((currentAppointments) =>
      currentAppointments.filter((appointment) => appointment.id !== id),
    )
  }

  function openNewTaskFromManager() {
    closeTaskManager()
    openNewTask()
  }

  function editTaskFromManager(task: Task) {
    closeTaskManager()
    openEditTask(task)
  }

  function openNewAppointmentFromManager() {
    closeAppointmentManager()
    openNewAppointment()
  }

  function editAppointmentFromManager(appointment: Appointment) {
    closeAppointmentManager()
    openEditAppointment(appointment)
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
              const isSupport = item.label === 'Rede de apoio'
              const isRoutine = item.label === 'Rotina de cuidados'
              const isAgenda = item.label === 'Agenda'

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (isSupport) {
                      openSupportModal()
                      return
                    }

                    if (isRoutine) {
                      openTaskManager()
                      return
                    }

                    if (isAgenda) {
                      openAppointmentManager()
                      return
                    }

                    document
                      .querySelector(item.href)
                      ?.scrollIntoView({ behavior: 'smooth' })
                    closeMenu()
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${
                    index === 0
                      ? 'bg-brand-lavender/30 text-brand-primary'
                      : 'text-brand-muted hover:bg-brand-background hover:text-brand-primary'
                  }`}
                >
                  <Icon size={19} />
                  {item.label}
                </button>
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
              <p className="text-xs text-brand-muted">Familiar responsável</p>
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
                {nextAppointment ? (
                  <>
                    <p className="mt-4 text-2xl font-extrabold text-brand-dark">
                      {getDateParts(nextAppointment.date).day}{' '}
                      {getDateParts(nextAppointment.date).month}.
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      {nextAppointment.title} · {nextAppointment.time}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="mt-4 text-lg font-extrabold text-brand-dark">
                      Nenhum
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">
                      Não há compromissos futuros
                    </p>
                  </>
                )}
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

              <button
                type="button"
                onClick={openSupportModal}
                className="rounded-2xl border border-brand-border bg-brand-surface p-5 text-left transition hover:border-brand-primary/30 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-brand-muted">
                    Rede de apoio
                  </span>
                  <span className="rounded-xl bg-brand-pink-light p-2 text-brand-pink">
                    <UsersRound size={19} />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-extrabold text-brand-dark">
                  {members.length}
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Pessoas vinculadas · Gerenciar
                </p>
              </button>
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
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={openTaskManager}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border px-4 py-2.5 text-xs font-extrabold text-brand-primary transition hover:bg-brand-background"
                  >
                    <ClipboardList size={15} />
                    Gerenciar rotina
                  </button>
                  <button
                    type="button"
                    onClick={openNewTask}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-dark"
                  >
                    <Plus size={16} />
                    Adicionar tarefa
                  </button>
                </div>
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
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                      Fique atento
                    </p>
                    <h2 className="mt-1 font-heading text-lg font-bold text-brand-dark">
                      Agenda de cuidados
                    </h2>
                  </div>
                  <CalendarDays size={21} className="text-brand-primary" />
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={openAppointmentManager}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border px-4 py-3 text-xs font-extrabold text-brand-primary transition hover:bg-brand-background"
                  >
                    <CalendarDays size={15} />
                    Gerenciar agenda
                  </button>
                  <button
                    type="button"
                    onClick={openNewAppointment}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-xs font-extrabold text-white transition hover:bg-brand-dark"
                  >
                    <Plus size={16} />
                    Adicionar compromisso
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {sortedAppointments.length === 0 ? (
                    <div className="rounded-xl bg-brand-background px-4 py-8 text-center">
                      <CalendarDays
                        size={28}
                        className="mx-auto text-brand-muted/70"
                      />
                      <p className="mt-3 text-sm font-extrabold text-brand-dark">
                        Agenda vazia
                      </p>
                      <p className="mt-1 text-xs text-brand-muted">
                        Cadastre consultas, exames ou outros compromissos.
                      </p>
                    </div>
                  ) : (
                    sortedAppointments.map((appointment, index) => {
                      const dateParts = getDateParts(appointment.date)

                      return (
                        <div
                          key={appointment.id}
                          className={`rounded-xl border p-4 transition ${
                            appointment.completed
                              ? 'border-brand-success/20 bg-brand-success/5'
                              : 'border-brand-border'
                          }`}
                        >
                          <div className="flex gap-3">
                            <div
                              className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl ${
                                appointment.completed
                                  ? 'bg-brand-success/10 text-brand-success'
                                  : index % 2 === 0
                                    ? 'bg-brand-lavender/30 text-brand-primary'
                                    : 'bg-brand-pink-light text-brand-pink'
                              }`}
                            >
                              <span className="text-[10px] font-extrabold uppercase">
                                {dateParts.month}
                              </span>
                              <span className="text-xl font-extrabold">
                                {dateParts.day}
                              </span>
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <p
                                  className={`text-sm font-extrabold ${
                                    appointment.completed
                                      ? 'text-brand-muted line-through'
                                      : 'text-brand-dark'
                                  }`}
                                >
                                  {appointment.title}
                                </p>
                                <span className="rounded-full bg-brand-background px-2 py-0.5 text-[10px] font-bold text-brand-muted">
                                  {appointment.category}
                                </span>
                              </div>

                              {appointment.description && (
                                <p className="mt-1 text-xs text-brand-muted">
                                  {appointment.description}
                                </p>
                              )}

                              <p className="mt-2 flex items-center gap-1 text-xs font-bold text-brand-primary">
                                <Clock3 size={13} />
                                {appointment.time}
                              </p>

                              {appointment.location && (
                                <p className="mt-1 flex items-center gap-1 text-xs text-brand-muted">
                                  <MapPin size={12} />
                                  {appointment.location}
                                </p>
                              )}

                              <p className="mt-1 text-[11px] text-brand-muted">
                                Responsável: {appointment.responsible}
                              </p>

                              {appointment.completed && (
                                <p className="mt-2 text-[11px] font-bold text-brand-success">
                                  Compromisso concluído
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap justify-end gap-2 border-t border-brand-border pt-3">
                            <button
                              type="button"
                              onClick={() =>
                                toggleAppointment(appointment.id)
                              }
                              className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold transition ${
                                appointment.completed
                                  ? 'bg-brand-success/10 text-brand-success hover:bg-brand-success/20'
                                  : 'bg-brand-lavender/30 text-brand-primary hover:bg-brand-lavender/50'
                              }`}
                            >
                              <Check size={13} />
                              {appointment.completed
                                ? 'Concluído'
                                : 'Concluir'}
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditAppointment(appointment)
                              }
                              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-lavender/30 hover:text-brand-primary"
                            >
                              <Pencil size={13} />
                              Editar
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteAppointment(appointment.id)
                              }
                              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-danger/10 hover:text-brand-danger"
                            >
                              <Trash2 size={13} />
                              Excluir
                            </button>
                          </div>
                        </div>
                      )
                    })
                  )}
                </div>
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
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-lavender/30 text-xs font-extrabold text-brand-primary">
                        {member.name
                          .split(' ')
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-extrabold text-brand-dark">
                          {member.name}
                        </p>
                        <p className="text-xs text-brand-muted">
                          {member.role}
                        </p>
                      </div>
                      {member.owner ? (
                        <span className="rounded-full bg-brand-lavender/30 px-2.5 py-1 text-[10px] font-bold text-brand-primary">
                          Você
                        </span>
                      ) : (
                        <span className="rounded-full bg-brand-background px-2.5 py-1 text-[10px] font-bold text-brand-muted">
                          {member.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={openSupportModal}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-brand-border px-4 py-3 text-xs font-extrabold text-brand-primary transition hover:bg-brand-background"
                >
                  <UsersRound size={15} />
                  Gerenciar rede de apoio
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

      {taskManagerOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-brand-ink/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-manager-title"
            className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-brand-border bg-brand-surface p-5 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Organização diária
                </p>
                <h2
                  id="task-manager-title"
                  className="mt-1 font-heading text-xl font-bold text-brand-dark sm:text-2xl"
                >
                  Gerenciar rotina de cuidados
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Organize as atividades e acompanhe o andamento dos cuidados.
                </p>
              </div>
              <button
                type="button"
                onClick={closeTaskManager}
                aria-label="Fechar gerenciamento da rotina"
                className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-background hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-brand-background p-3 sm:p-4">
                <p className="text-[11px] font-bold text-brand-muted">Total</p>
                <p className="mt-1 text-2xl font-extrabold text-brand-dark">
                  {tasks.length}
                </p>
              </div>
              <div className="rounded-xl bg-brand-success/5 p-3 sm:p-4">
                <p className="text-[11px] font-bold text-brand-success">
                  Concluídas
                </p>
                <p className="mt-1 text-2xl font-extrabold text-brand-success">
                  {completedTasks}
                </p>
              </div>
              <div className="rounded-xl bg-brand-warning/5 p-3 sm:p-4">
                <p className="text-[11px] font-bold text-brand-warning">
                  Pendentes
                </p>
                <p className="mt-1 text-2xl font-extrabold text-brand-warning">
                  {pendingTasks}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {(['Todas', 'Pendentes', 'Concluídas'] as TaskFilter[]).map(
                  (filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setTaskFilter(filter)}
                      className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                        taskFilter === filter
                          ? 'bg-brand-primary text-white'
                          : 'border border-brand-border text-brand-muted hover:bg-brand-background'
                      }`}
                    >
                      {filter}
                    </button>
                  ),
                )}
              </div>

              <button
                type="button"
                onClick={openNewTaskFromManager}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-xs font-extrabold text-white transition hover:bg-brand-dark"
              >
                <Plus size={16} />
                Nova tarefa
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {filteredTasks.length === 0 ? (
                <div className="rounded-xl bg-brand-background px-4 py-10 text-center">
                  <ClipboardList
                    size={30}
                    className="mx-auto text-brand-muted/70"
                  />
                  <p className="mt-3 text-sm font-extrabold text-brand-dark">
                    {taskFilter === 'Todas'
                      ? 'Nenhuma tarefa cadastrada'
                      : `Nenhuma tarefa ${taskFilter.toLowerCase()}`}
                  </p>
                  <p className="mt-1 text-xs text-brand-muted">
                    Adicione uma tarefa ou altere o filtro selecionado.
                  </p>
                </div>
              ) : (
                filteredTasks.map((task) => {
                  const Icon = categoryIcons[task.category]

                  return (
                    <div
                      key={task.id}
                      className="flex flex-wrap items-center gap-3 rounded-xl border border-brand-border p-4"
                    >
                      <button
                        type="button"
                        onClick={() => toggleTask(task.id)}
                        aria-label={
                          task.completed
                            ? `Reabrir ${task.title}`
                            : `Concluir ${task.title}`
                        }
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition ${
                          task.completed
                            ? 'border-brand-success bg-brand-success text-white'
                            : 'border-brand-border text-transparent hover:border-brand-primary'
                        }`}
                      >
                        <Check size={15} />
                      </button>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                          task.completed
                            ? 'bg-brand-success/10 text-brand-success'
                            : 'bg-brand-pink-light text-brand-pink'
                        }`}
                      >
                        <Icon size={18} />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-extrabold ${
                            task.completed
                              ? 'text-brand-muted line-through'
                              : 'text-brand-dark'
                          }`}
                        >
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs text-brand-muted">
                          {task.description || task.category}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-brand-muted">
                          <span className="flex items-center gap-1">
                            <Clock3 size={12} />
                            {task.time}
                          </span>
                          <span>{task.category}</span>
                          <span>Responsável: {task.responsible}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => editTaskFromManager(task)}
                          aria-label={`Editar ${task.title}`}
                          className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-lavender/30 hover:text-brand-primary"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteTask(task.id)}
                          aria-label={`Excluir ${task.title}`}
                          className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-danger/10 hover:text-brand-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="mt-6 flex justify-end border-t border-brand-border pt-5">
              <button
                type="button"
                onClick={closeTaskManager}
                className="rounded-xl border border-brand-border px-5 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-background"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {appointmentManagerOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-brand-ink/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-manager-title"
            className="my-auto max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-brand-border bg-brand-surface p-5 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Compromissos e consultas
                </p>
                <h2
                  id="appointment-manager-title"
                  className="mt-1 font-heading text-xl font-bold text-brand-dark sm:text-2xl"
                >
                  Gerenciar agenda
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Acompanhe consultas, exames e outros compromissos.
                </p>
              </div>
              <button
                type="button"
                onClick={closeAppointmentManager}
                aria-label="Fechar gerenciamento da agenda"
                className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-background hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-brand-background p-3 sm:p-4">
                <p className="text-[11px] font-bold text-brand-muted">Total</p>
                <p className="mt-1 text-2xl font-extrabold text-brand-dark">
                  {appointments.length}
                </p>
              </div>
              <div className="rounded-xl bg-brand-success/5 p-3 sm:p-4">
                <p className="text-[11px] font-bold text-brand-success">
                  Concluídos
                </p>
                <p className="mt-1 text-2xl font-extrabold text-brand-success">
                  {completedAppointments}
                </p>
              </div>
              <div className="rounded-xl bg-brand-warning/5 p-3 sm:p-4">
                <p className="text-[11px] font-bold text-brand-warning">
                  Pendentes
                </p>
                <p className="mt-1 text-2xl font-extrabold text-brand-warning">
                  {pendingAppointments}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-2">
                {(
                  ['Todos', 'Pendentes', 'Concluídos'] as AppointmentFilter[]
                ).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setAppointmentFilter(filter)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                      appointmentFilter === filter
                        ? 'bg-brand-primary text-white'
                        : 'border border-brand-border text-brand-muted hover:bg-brand-background'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={openNewAppointmentFromManager}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-xs font-extrabold text-white transition hover:bg-brand-dark"
              >
                <Plus size={16} />
                Novo compromisso
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {filteredAppointments.length === 0 ? (
                <div className="rounded-xl bg-brand-background px-4 py-10 text-center">
                  <CalendarDays
                    size={30}
                    className="mx-auto text-brand-muted/70"
                  />
                  <p className="mt-3 text-sm font-extrabold text-brand-dark">
                    {appointmentFilter === 'Todos'
                      ? 'Nenhum compromisso cadastrado'
                      : `Nenhum compromisso ${appointmentFilter.toLowerCase()}`}
                  </p>
                  <p className="mt-1 text-xs text-brand-muted">
                    Cadastre um compromisso ou altere o filtro selecionado.
                  </p>
                </div>
              ) : (
                filteredAppointments.map((appointment) => {
                  const dateParts = getDateParts(appointment.date)

                  return (
                    <div
                      key={appointment.id}
                      className="rounded-xl border border-brand-border p-4"
                    >
                      <div className="flex flex-wrap items-start gap-3">
                        <div
                          className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xl ${
                            appointment.completed
                              ? 'bg-brand-success/10 text-brand-success'
                              : 'bg-brand-lavender/30 text-brand-primary'
                          }`}
                        >
                          <span className="text-[10px] font-extrabold uppercase">
                            {dateParts.month}
                          </span>
                          <span className="text-xl font-extrabold">
                            {dateParts.day}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p
                              className={`text-sm font-extrabold ${
                                appointment.completed
                                  ? 'text-brand-muted line-through'
                                  : 'text-brand-dark'
                              }`}
                            >
                              {appointment.title}
                            </p>
                            <span className="rounded-full bg-brand-background px-2 py-0.5 text-[10px] font-bold text-brand-muted">
                              {appointment.category}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                appointment.completed
                                  ? 'bg-brand-success/10 text-brand-success'
                                  : 'bg-brand-warning/10 text-brand-warning'
                              }`}
                            >
                              {appointment.completed ? 'Concluído' : 'Pendente'}
                            </span>
                          </div>

                          {appointment.description && (
                            <p className="mt-1 text-xs text-brand-muted">
                              {appointment.description}
                            </p>
                          )}

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-brand-muted">
                            <span className="flex items-center gap-1">
                              <CalendarDays size={13} />
                              {getFormattedDate(appointment.date)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock3 size={13} />
                              {appointment.time}
                            </span>
                            {appointment.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={13} />
                                {appointment.location}
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-[11px] text-brand-muted">
                            Responsável: {appointment.responsible}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap justify-end gap-2 border-t border-brand-border pt-3">
                        <button
                          type="button"
                          onClick={() => toggleAppointment(appointment.id)}
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold transition ${
                            appointment.completed
                              ? 'bg-brand-success/10 text-brand-success hover:bg-brand-success/20'
                              : 'bg-brand-lavender/30 text-brand-primary hover:bg-brand-lavender/50'
                          }`}
                        >
                          <Check size={13} />
                          {appointment.completed
                            ? 'Reabrir'
                            : 'Marcar como concluído'}
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            editAppointmentFromManager(appointment)
                          }
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-lavender/30 hover:text-brand-primary"
                        >
                          <Pencil size={13} />
                          Editar
                        </button>

                        <button
                          type="button"
                          onClick={() => deleteAppointment(appointment.id)}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-brand-muted transition hover:bg-brand-danger/10 hover:text-brand-danger"
                        >
                          <Trash2 size={13} />
                          Excluir
                        </button>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            <div className="mt-6 flex justify-end border-t border-brand-border pt-5">
              <button
                type="button"
                onClick={closeAppointmentManager}
                className="rounded-xl border border-brand-border px-5 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-background"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {supportModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-brand-ink/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-title"
            className="my-auto w-full max-w-xl rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Cuidado compartilhado
                </p>
                <h2
                  id="support-modal-title"
                  className="mt-1 font-heading text-xl font-bold text-brand-dark"
                >
                  Gerenciar rede de apoio
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Controle quem participa dos cuidados de Helena.
                </p>
              </div>
              <button
                type="button"
                onClick={closeSupportModal}
                aria-label="Fechar gerenciamento"
                className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-background hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-brand-background p-4">
              <div>
                <p className="text-sm font-extrabold text-brand-dark">
                  {members.length} pessoas na rede
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Familiar responsável: Ana Martins
                </p>
              </div>
              <UsersRound size={22} className="text-brand-primary" />
            </div>

            <div className="mt-5 space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex flex-wrap items-center gap-3 rounded-xl border border-brand-border p-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-lavender/30 text-xs font-extrabold text-brand-primary">
                    {member.name
                      .split(' ')
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-extrabold text-brand-dark">
                        {member.name}
                      </p>
                      {member.owner && (
                        <span className="rounded-full bg-brand-lavender/30 px-2 py-0.5 text-[10px] font-bold text-brand-primary">
                          Responsável
                        </span>
                      )}
                    </div>
                    <p className="mt-1 flex items-center gap-1 break-all text-xs text-brand-muted">
                      <Mail size={12} />
                      {member.email}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-brand-muted">
                        {member.role}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          member.status === 'Ativo'
                            ? 'bg-brand-success/10 text-brand-success'
                            : 'bg-brand-warning/10 text-brand-warning'
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>
                  </div>

                  {!member.owner && (
                    <button
                      type="button"
                      onClick={() => deleteMember(member)}
                      aria-label={`Remover ${member.name}`}
                      className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-danger/10 hover:text-brand-danger"
                    >
                      <Trash2 size={17} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {!memberFormOpen ? (
              <button
                type="button"
                onClick={openMemberForm}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark"
              >
                <UserPlus size={17} />
                Adicionar pessoa à rede
              </button>
            ) : (
              <form
                onSubmit={handleMemberSubmit}
                className="mt-5 rounded-xl border border-brand-border bg-brand-background p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-dark">
                      Novo participante
                    </h3>
                    <p className="mt-1 text-xs text-brand-muted">
                      Informe os dados de quem deseja convidar.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setMemberFormOpen(false)
                      setMemberError('')
                    }}
                    aria-label="Cancelar adição"
                    className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-border"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  <div>
                    <label
                      htmlFor="member-name"
                      className="mb-1.5 block text-xs font-bold text-brand-dark"
                    >
                      Nome completo
                    </label>
                    <input
                      id="member-name"
                      type="text"
                      required
                      minLength={3}
                      maxLength={80}
                      value={memberForm.name}
                      onChange={(event) => {
                        setMemberForm({
                          ...memberForm,
                          name: event.target.value,
                        })
                        setMemberError('')
                      }}
                      placeholder="Nome da pessoa"
                      className="w-full rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="member-email"
                      className="mb-1.5 block text-xs font-bold text-brand-dark"
                    >
                      E-mail
                    </label>
                    <input
                      id="member-email"
                      type="email"
                      required
                      maxLength={120}
                      value={memberForm.email}
                      onChange={(event) => {
                        setMemberForm({
                          ...memberForm,
                          email: event.target.value,
                        })
                        setMemberError('')
                      }}
                      placeholder="email@exemplo.com"
                      className="w-full rounded-xl border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="member-role"
                      className="mb-1.5 block text-xs font-bold text-brand-dark"
                    >
                      Tipo de participante
                    </label>
                    <select
                      id="member-role"
                      value={memberForm.role}
                      onChange={(event) =>
                        setMemberForm({
                          ...memberForm,
                          role: event.target.value as SupportMember['role'],
                        })
                      }
                      className="w-full rounded-xl border border-brand-border bg-brand-surface px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                    >
                      <option value="Familiar">Familiar</option>
                      <option value="Cuidador">Cuidador</option>
                    </select>
                  </div>

                  {memberError && (
                    <p className="rounded-lg bg-brand-danger/10 px-3 py-2 text-xs font-semibold text-brand-danger">
                      {memberError}
                    </p>
                  )}

                  <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setMemberFormOpen(false)
                        setMemberError('')
                      }}
                      className="rounded-xl border border-brand-border px-5 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-surface"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark"
                    >
                      <UserPlus size={16} />
                      Enviar convite
                    </button>
                  </div>
                </div>
              </form>
            )}

            <p className="mt-4 text-[11px] leading-relaxed text-brand-muted">
              A remoção de uma pessoa também desvincula seu nome das tarefas e
              compromissos atribuídos a ela. O responsável principal não pode
              ser removido por este painel.
            </p>
          </div>
        </div>
      )}

      {taskModalOpen && (
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

            <form onSubmit={handleTaskSubmit} className="mt-6 space-y-4">
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
                  value={taskForm.title}
                  onChange={(event) =>
                    setTaskForm({ ...taskForm, title: event.target.value })
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
                  value={taskForm.description}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      description: event.target.value,
                    })
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
                    value={taskForm.category}
                    onChange={(event) =>
                      setTaskForm({
                        ...taskForm,
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
                    value={taskForm.time}
                    onChange={(event) =>
                      setTaskForm({ ...taskForm, time: event.target.value })
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
                  value={taskForm.responsible}
                  onChange={(event) =>
                    setTaskForm({
                      ...taskForm,
                      responsible: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                >
                  <option value="">Selecione uma pessoa</option>
                  {responsibleOptions.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
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
                  {editingTask !== null
                    ? 'Salvar alterações'
                    : 'Adicionar tarefa'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {appointmentModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-brand-ink/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="appointment-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Agenda de cuidados
                </p>
                <h2
                  id="appointment-modal-title"
                  className="mt-1 font-heading text-xl font-bold text-brand-dark"
                >
                  {editingAppointment !== null
                    ? 'Editar compromisso'
                    : 'Novo compromisso'}
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Cadastre os detalhes do compromisso.
                </p>
              </div>
              <button
                type="button"
                onClick={closeAppointmentModal}
                aria-label="Fechar formulário"
                className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-background hover:text-brand-dark"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleAppointmentSubmit}
              className="mt-6 space-y-4"
            >
              <div>
                <label
                  htmlFor="appointment-title"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Nome do compromisso
                </label>
                <input
                  id="appointment-title"
                  type="text"
                  required
                  maxLength={70}
                  value={appointmentForm.title}
                  onChange={(event) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      title: event.target.value,
                    })
                  }
                  placeholder="Ex.: Consulta com cardiologista"
                  className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                />
              </div>

              <div>
                <label
                  htmlFor="appointment-description"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Descrição
                </label>
                <textarea
                  id="appointment-description"
                  rows={2}
                  maxLength={180}
                  value={appointmentForm.description}
                  onChange={(event) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      description: event.target.value,
                    })
                  }
                  placeholder="Informações adicionais sobre o compromisso"
                  className="w-full resize-none rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                />
              </div>

              <div>
                <label
                  htmlFor="appointment-category"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Tipo de compromisso
                </label>
                <select
                  id="appointment-category"
                  value={appointmentForm.category}
                  onChange={(event) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      category: event.target.value as AppointmentCategory,
                    })
                  }
                  className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                >
                  <option value="Consulta">Consulta</option>
                  <option value="Exame">Exame</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="appointment-date"
                    className="mb-1.5 block text-xs font-bold text-brand-dark"
                  >
                    Data
                  </label>
                  <input
                    id="appointment-date"
                    type="date"
                    required
                    min={new Date().toLocaleDateString('en-CA')}
                    value={appointmentForm.date}
                    onChange={(event) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        date: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                  />
                </div>

                <div>
                  <label
                    htmlFor="appointment-time"
                    className="mb-1.5 block text-xs font-bold text-brand-dark"
                  >
                    Horário
                  </label>
                  <input
                    id="appointment-time"
                    type="time"
                    required
                    value={appointmentForm.time}
                    onChange={(event) =>
                      setAppointmentForm({
                        ...appointmentForm,
                        time: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="appointment-location"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Local
                </label>
                <input
                  id="appointment-location"
                  type="text"
                  maxLength={100}
                  value={appointmentForm.location}
                  onChange={(event) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      location: event.target.value,
                    })
                  }
                  placeholder="Ex.: Clínica ou laboratório"
                  className="w-full rounded-xl border border-brand-border bg-brand-background px-4 py-3 text-sm text-brand-ink outline-none transition placeholder:text-brand-muted/70 focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                />
              </div>

              <div>
                <label
                  htmlFor="appointment-responsible"
                  className="mb-1.5 block text-xs font-bold text-brand-dark"
                >
                  Responsável
                </label>
                <select
                  id="appointment-responsible"
                  required
                  value={appointmentForm.responsible}
                  onChange={(event) =>
                    setAppointmentForm({
                      ...appointmentForm,
                      responsible: event.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-brand-border bg-brand-background px-3 py-3 text-sm text-brand-ink outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-lavender/30"
                >
                  <option value="">Selecione uma pessoa</option>
                  {responsibleOptions.map((person) => (
                    <option key={person} value={person}>
                      {person}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeAppointmentModal}
                  className="rounded-xl border border-brand-border px-5 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-background"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark"
                >
                  <Check size={17} />
                  {editingAppointment !== null
                    ? 'Salvar alterações'
                    : 'Adicionar compromisso'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
