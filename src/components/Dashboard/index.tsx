
import { useMemo, useState, type FormEvent } from 'react'
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  ShieldAlert,
  UsersRound,
  X,
  UserRound,
  FileText,
  type LucideIcon,
} from 'lucide-react'

export type DashboardRole = 'familiar' | 'cuidador' | 'pessoa'

type DashboardProps = {
  role: DashboardRole
}

type Section =
  | 'Início'
  | 'Rotina'
  | 'Agenda'
  | 'Histórico'
  | 'Rede de apoio'
  | 'Emergência'

type CareItem = {
  id: number
  title: string
  description: string
  category: string
  time: string
  completed: boolean
  responsible: string
}

type Appointment = {
  id: number
  title: string
  category: string
  date: string
  time: string
  location: string
}

type RecordItem = {
  id: number
  title: string
  description: string
  category: string
  date: string
  time: string
  responsible: string
}

type ProfileConfig = {
  title: string
  description: string
  navigation: { label: Section; icon: LucideIcon }[]
  greeting: string
  overview: string
  primaryAction: string
}

const profiles: Record<DashboardRole, ProfileConfig> = {
  familiar: {
    title: 'Área da família',
    description: 'Organize e acompanhe os cuidados.',
    greeting: 'Como estão os cuidados hoje?',
    overview:
      'Acompanhe a rotina, os compromissos e os registros de quem você acompanha.',
    primaryAction: 'Novo lembrete',
    navigation: [
      { label: 'Início', icon: LayoutDashboard },
      { label: 'Rotina', icon: ClipboardList },
      { label: 'Agenda', icon: CalendarDays },
      { label: 'Histórico', icon: FileText },
      { label: 'Rede de apoio', icon: UsersRound },
      { label: 'Emergência', icon: ShieldAlert },
    ],
  },
  cuidador: {
    title: 'Área do cuidador',
    description: 'Organize seus atendimentos e registros.',
    greeting: 'Sua rotina de cuidados',
    overview:
      'Consulte os atendimentos, acompanhe as tarefas autorizadas e registre os cuidados realizados.',
    primaryAction: 'Adicionar registro',
    navigation: [
      { label: 'Início', icon: LayoutDashboard },
      { label: 'Rotina', icon: ClipboardList },
      { label: 'Agenda', icon: CalendarDays },
      { label: 'Histórico', icon: FileText },
      { label: 'Rede de apoio', icon: UsersRound },
      { label: 'Emergência', icon: ShieldAlert },
    ],
  },
  pessoa: {
    title: 'Meu espaço',
    description: 'Sua rotina, suas escolhas.',
    greeting: 'Olá! Como você está hoje?',
    overview:
      'Consulte seus compromissos, acompanhe sua rotina e escolha o que deseja compartilhar.',
    primaryAction: 'Adicionar registro',
    navigation: [
      { label: 'Início', icon: LayoutDashboard },
      { label: 'Rotina', icon: ClipboardList },
      { label: 'Agenda', icon: CalendarDays },
      { label: 'Histórico', icon: FileText },
      { label: 'Rede de apoio', icon: UsersRound },
      { label: 'Emergência', icon: ShieldAlert },
    ],
  },
}

const initialTasks: CareItem[] = [
  {
    id: 1,
    title: 'Medicamento da manhã',
    description: 'Conforme prescrição cadastrada',
    category: 'Medicamentos',
    time: '08:00',
    completed: true,
    responsible: 'Ana Martins',
  },
  {
    id: 2,
    title: 'Café da manhã',
    description: 'Registro da refeição',
    category: 'Alimentação',
    time: '08:30',
    completed: true,
    responsible: 'Ana Martins',
  },
  {
    id: 3,
    title: 'Hidratação',
    description: 'Registrar o consumo de água',
    category: 'Hidratação',
    time: '10:00',
    completed: false,
    responsible: 'João Martins',
  },
  {
    id: 4,
    title: 'Caminhada leve',
    description: 'Atividade acompanhada',
    category: 'Atividades físicas e mobilidade',
    time: '14:00',
    completed: false,
    responsible: 'Renata Costa',
  },
  {
    id: 5,
    title: 'Medicamento da noite',
    description: 'Conforme prescrição cadastrada',
    category: 'Medicamentos',
    time: '20:00',
    completed: false,
    responsible: 'Ana Martins',
  },
]

const initialAppointments: Appointment[] = [
  {
    id: 1,
    title: 'Consulta médica',
    category: 'Consulta',
    date: '2026-11-19',
    time: '09:30',
    location: 'Clínica Central',
  },
  {
    id: 2,
    title: 'Exame de rotina',
    category: 'Exame',
    date: '2026-11-22',
    time: '08:00',
    location: 'Laboratório Central',
  },
]

const initialRecords: RecordItem[] = [
  {
    id: 1,
    title: 'Rotina da manhã concluída',
    description: 'Medicação e café da manhã registrados.',
    category: 'Rotina',
    date: '2026-11-17',
    time: '09:00',
    responsible: 'Ana Martins',
  },
  {
    id: 2,
    title: 'Hidratação registrada',
    description: 'Consumo de água registrado durante a manhã.',
    category: 'Hidratação',
    date: '2026-11-16',
    time: '10:15',
    responsible: 'João Martins',
  },
]

const categories = [
  'Medicamentos',
  'Consultas e exames',
  'Alimentação',
  'Hidratação',
  'Medições de saúde',
  'Sono',
  'Atividades físicas e mobilidade',
  'Alertas',
  'Bem-estar',
]

function formatDate(date: string) {
  if (!date) return ''

  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function getRoleName(role: DashboardRole) {
  if (role === 'familiar') return 'Ana Martins'
  if (role === 'cuidador') return 'Renata Costa'
  return 'Maria Oliveira'
}

export default function Dashboard({ role }: DashboardProps) {
  const profile = profiles[role]
  const userName = getRoleName(role)

  const [activeSection, setActiveSection] = useState<Section>('Início')
  const [tasks, setTasks] = useState(initialTasks)
  const [appointments, setAppointments] = useState(initialAppointments)
  const [records, setRecords] = useState(initialRecords)
  const [modal, setModal] = useState<'reminder' | 'record' | 'appointment' | 'settings' | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [readNotifications, setReadNotifications] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Medicamentos',
    date: '',
    time: '',
    location: '',
  })

  const pendingTasks = tasks.filter((task) => !task.completed)
  const completedTasks = tasks.filter((task) => task.completed)

  const completion = useMemo(() => {
    if (!tasks.length) return 0
    return Math.round((completedTasks.length / tasks.length) * 100)
  }, [tasks, completedTasks.length])

  const notifications = [
    {
      title: 'Rotina atualizada',
      description: 'Uma atividade foi adicionada à rotina.',
    },
    {
      title: 'Próximo compromisso',
      description: 'Você tem um compromisso agendado.',
    },
  ]

  function changeSection(section: Section) {
    setActiveSection(section)
    setMobileMenuOpen(false)
    setNotificationsOpen(false)
    setProfileOpen(false)
  }

  function openModal(type: 'reminder' | 'record' | 'appointment' | 'settings') {
    setForm({
      title: '',
      description: '',
      category: 'Medicamentos',
      date: '',
      time: '',
      location: '',
    })
    setMessage('')
    setModal(type)
  }

  function closeModal() {
    setModal(null)
    setMessage('')
  }

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.title.trim()) {
      setMessage('Informe um título.')
      return
    }

    if (modal === 'reminder') {
      if (!form.date || !form.time) {
        setMessage('Informe a data e o horário.')
        return
      }

      setTasks((current) => [
        ...current,
        {
          id: Date.now(),
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          time: form.time,
          completed: false,
          responsible: userName,
        },
      ])
    }

    if (modal === 'record') {
      setRecords((current) => [
        {
          id: Date.now(),
          title: form.title.trim(),
          description: form.description.trim(),
          category: form.category,
          date: new Date().toISOString().slice(0, 10),
          time: new Date().toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          responsible: userName,
        },
        ...current,
      ])
    }

    if (modal === 'appointment') {
      if (!form.date || !form.time) {
        setMessage('Informe a data e o horário.')
        return
      }

      setAppointments((current) => [
        ...current,
        {
          id: Date.now(),
          title: form.title.trim(),
          category: form.category,
          date: form.date,
          time: form.time,
          location: form.location.trim(),
        },
      ])
    }

    setMessage('Informação adicionada nesta demonstração.')
    window.setTimeout(() => {
      setModal(null)
      setMessage('')
    }, 900)
  }

  function getSectionTitle() {
    if (activeSection === 'Início') return profile.greeting
    if (activeSection === 'Rotina') return 'Rotina de cuidados'
    return activeSection
  }

  function getSectionDescription() {
    const descriptions: Record<Section, string> = {
      Início: profile.overview,
      Rotina: 'Consulte atividades, organize lembretes e registre o que aconteceu.',
      Agenda: 'Visualize consultas, exames e outros compromissos.',
      Histórico: 'Consulte os registros realizados e quem os adicionou.',
      'Rede de apoio': 'Veja as pessoas envolvidas no cuidado e as informações compartilhadas.',
      Emergência: 'Consulte os contatos de confiança e as orientações para pedir ajuda.',
    }

    return descriptions[activeSection]
  }

  function renderTasks() {
    return (
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col gap-3 rounded-2xl border border-brand-border bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                aria-label={task.completed ? 'Marcar como pendente' : 'Marcar como concluída'}
                className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                  task.completed
                    ? 'border-brand-success bg-brand-success text-white'
                    : 'border-brand-border text-transparent'
                }`}
              >
                <Check size={14} />
              </button>
              <div>
                <p className={`font-bold ${task.completed ? 'text-brand-muted line-through' : 'text-brand-ink'}`}>
                  {task.title}
                </p>
                <p className="mt-1 text-sm text-brand-muted">{task.description}</p>
                <p className="mt-2 text-xs text-brand-muted">
                  {task.category} · Responsável: {task.responsible}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-muted sm:pl-4">
              <Clock3 size={16} />
              {task.time}
            </div>
          </div>
        ))}
        {!tasks.length && (
          <EmptyState title="Nenhuma atividade cadastrada" description="Adicione um lembrete para organizar a rotina." />
        )}
      </div>
    )
  }

  function renderAppointments() {
    return (
      <div className="grid gap-3 md:grid-cols-2">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="rounded-2xl border border-brand-border bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                <CalendarDays size={21} />
              </div>
              <span className="rounded-full bg-brand-pink-light px-3 py-1 text-xs font-bold text-brand-primary">
                {appointment.category}
              </span>
            </div>
            <h3 className="mt-4 font-bold text-brand-ink">{appointment.title}</h3>
            <p className="mt-2 text-sm text-brand-muted">{formatDate(appointment.date)}</p>
            <p className="mt-1 text-sm text-brand-muted">{appointment.time} · {appointment.location || 'Local não informado'}</p>
          </div>
        ))}
        {!appointments.length && (
          <EmptyState title="Agenda vazia" description="Nenhum compromisso cadastrado." />
        )}
      </div>
    )
  }

  function renderRecords() {
    return (
      <div className="space-y-3">
        {records.map((record) => (
          <div key={record.id} className="rounded-2xl border border-brand-border bg-white p-5">
            <div className="flex flex-col justify-between gap-2 sm:flex-row">
              <div>
                <span className="text-xs font-bold uppercase tracking-wide text-brand-primary">{record.category}</span>
                <h3 className="mt-1 font-bold text-brand-ink">{record.title}</h3>
                <p className="mt-2 text-sm text-brand-muted">{record.description}</p>
              </div>
              <div className="text-sm text-brand-muted sm:text-right">
                <p>{formatDate(record.date)}</p>
                <p className="mt-1">{record.time}</p>
                <p className="mt-1">Por {record.responsible}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  function renderSupport() {
    const members = [
      { name: 'Ana Martins', role: 'Familiar', status: 'Acesso ativo' },
      { name: 'João Martins', role: 'Familiar', status: 'Acesso ativo' },
      { name: 'Renata Costa', role: 'Cuidadora profissional', status: 'Acesso autorizado' },
    ]

    return (
      <div className="grid gap-3 md:grid-cols-2">
        {members.map((member) => (
          <div key={member.name} className="flex items-center gap-4 rounded-2xl border border-brand-border bg-white p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-pink-light text-brand-primary">
              <UserRound size={22} />
            </div>
            <div>
              <h3 className="font-bold text-brand-ink">{member.name}</h3>
              <p className="mt-1 text-sm text-brand-muted">{member.role}</p>
              <p className="mt-1 text-xs font-semibold text-brand-success">{member.status}</p>
            </div>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-brand-border bg-white p-5 md:col-span-2">
          <p className="font-bold text-brand-ink">Compartilhamento de informações</p>
          <p className="mt-2 text-sm leading-6 text-brand-muted">
            As permissões de visualização e registro devem ser definidas pela pessoa acompanhada ou por quem possui autorização para gerenciar o vínculo.
          </p>
        </div>
      </div>
    )
  }

  function renderEmergency() {
    return (
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-brand-border bg-white p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-brand-danger">
            <ShieldAlert size={24} />
          </div>
          <h3 className="mt-4 text-lg font-bold text-brand-ink">Pedido de ajuda</h3>
          <p className="mt-2 text-sm leading-6 text-brand-muted">
            Esta demonstração não envia notificações reais nem realiza ligações de emergência.
          </p>
          <button
            type="button"
            onClick={() => window.alert('Demonstração: nenhum contato foi notificado.')}
            className="mt-5 w-full rounded-xl bg-brand-danger px-5 py-3 font-bold text-white transition hover:opacity-90"
          >
            Simular pedido de ajuda
          </button>
        </div>
        <div className="rounded-2xl border border-brand-border bg-white p-6">
          <h3 className="font-bold text-brand-ink">Contatos de emergência</h3>
          <div className="mt-4 space-y-4">
            <div>
              <p className="font-semibold text-brand-ink">Ana Martins</p>
              <p className="text-sm text-brand-muted">Contato de confiança</p>
            </div>
            <div>
              <p className="font-semibold text-brand-ink">SAMU — 192</p>
              <p className="text-sm text-brand-muted">Serviço de atendimento móvel de urgência</p>
            </div>
          </div>
          <p className="mt-5 border-t border-brand-border pt-4 text-xs leading-5 text-brand-muted">
            Em uma emergência real, entre em contato diretamente com o serviço público adequado.
          </p>
        </div>
      </div>
    )
  }

  function renderOverview() {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={ClipboardList} label="Atividades do dia" value={String(tasks.length)} detail="Na rotina cadastrada" />
          <MetricCard icon={Check} label="Concluídas" value={String(completedTasks.length)} detail="Atividades registradas" />
          <MetricCard icon={Clock3} label="Pendentes" value={String(pendingTasks.length)} detail="Aguardando registro" />
          <MetricCard icon={CalendarDays} label="Compromissos" value={String(appointments.length)} detail="Na agenda demonstrativa" />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-brand-ink">Progresso da rotina</h3>
                <p className="mt-1 text-sm text-brand-muted">Atividades marcadas como concluídas</p>
              </div>
              <span className="text-xl font-bold text-brand-primary">{completion}%</span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-brand-pink-light">
              <div className="h-full rounded-full bg-brand-primary transition-all" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-brand-muted">{completedTasks.length} concluídas</span>
              <span className="font-semibold text-brand-ink">{pendingTasks.length} pendentes</span>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
            <h3 className="font-bold text-brand-ink">Próximos compromissos</h3>
            <div className="mt-4 space-y-4">
              {appointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
                    <CalendarDays size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-ink">{appointment.title}</p>
                    <p className="mt-1 text-xs text-brand-muted">
                      {formatDate(appointment.date)} · {appointment.time}
                    </p>
                  </div>
                </div>
              ))}
              {!appointments.length && <p className="text-sm text-brand-muted">Nenhum compromisso cadastrado.</p>}
            </div>
            <button type="button" onClick={() => changeSection('Agenda')} className="mt-5 text-sm font-bold text-brand-primary hover:text-brand-dark">
              Ver agenda
            </button>
          </section>
        </div>

        <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-brand-ink">Atividades da rotina</h3>
              <p className="mt-1 text-sm text-brand-muted">Acompanhe o andamento do dia.</p>
            </div>
            <button type="button" onClick={() => changeSection('Rotina')} className="text-sm font-bold text-brand-primary">
              Ver rotina
            </button>
          </div>
          {renderTasks()}
        </section>
      </div>
    )
  }

  function renderSection() {
    if (activeSection === 'Início') return renderOverview()

    if (activeSection === 'Rotina') {
      return (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => openModal('reminder')} className="rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white hover:bg-brand-dark">
              <Plus className="mr-2 inline" size={17} />
              Novo lembrete
            </button>
            <button type="button" onClick={() => openModal('record')} className="rounded-xl border border-brand-border bg-white px-4 py-3 text-sm font-bold text-brand-primary hover:bg-brand-pink-light">
              <Plus className="mr-2 inline" size={17} />
              Adicionar registro
            </button>
          </div>
          <div className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
            <div className="mb-5">
              <h3 className="font-bold text-brand-ink">Atividades cadastradas</h3>
              <p className="mt-1 text-sm text-brand-muted">Marque quando uma atividade estiver concluída ou registrada.</p>
            </div>
            {renderTasks()}
          </div>
        </div>
      )
    }

    if (activeSection === 'Agenda') {
      return (
        <div className="space-y-5">
          <button type="button" onClick={() => openModal('appointment')} className="rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white hover:bg-brand-dark">
            <Plus className="mr-2 inline" size={17} />
            Novo compromisso
          </button>
          {renderAppointments()}
        </div>
      )
    }

    if (activeSection === 'Histórico') return renderRecords()
    if (activeSection === 'Rede de apoio') return renderSupport()
    if (activeSection === 'Emergência') return renderEmergency()

    return null
  }

  return (
    <div className="min-h-screen bg-brand-background text-brand-ink">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-brand-border bg-white transition-transform lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-20 items-center justify-between border-b border-brand-border px-6">
          <div>
            <span className="text-2xl font-extrabold text-brand-dark">Cuidar<span className="text-brand-pink">+</span></span>
            <p className="mt-0.5 text-xs text-brand-muted">{profile.title}</p>
          </div>
          <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-lg p-2 text-brand-muted hover:bg-brand-pink-light lg:hidden" aria-label="Fechar menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-wider text-brand-muted">Menu principal</p>
          {profile.navigation.map((item) => {
            const Icon = item.icon
            const active = activeSection === item.label

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => changeSection(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                  active
                    ? 'bg-brand-pink-light text-brand-primary'
                    : 'text-brand-muted hover:bg-brand-background hover:text-brand-primary'
                }`}
              >
                <Icon size={19} />
                {item.label}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-brand-border p-4">
          <div className="rounded-2xl bg-brand-background p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pink-light text-brand-primary">
                <Heart size={19} />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-ink">Cuidado compartilhado</p>
                <p className="mt-1 text-xs text-brand-muted">Todo cuidado importa.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {mobileMenuOpen && (
        <button type="button" aria-label="Fechar menu" onClick={() => setMobileMenuOpen(false)} className="fixed inset-0 z-30 bg-black/30 lg:hidden" />
      )}

      <div className="min-h-screen lg:pl-72">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-brand-border bg-white/95 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="rounded-xl p-2 text-brand-muted hover:bg-brand-pink-light lg:hidden" aria-label="Abrir menu">
              <Menu size={22} />
            </button>
            <div>
              <p className="text-sm font-bold text-brand-ink">{profile.title}</p>
              <p className="hidden text-xs text-brand-muted sm:block">{profile.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <button type="button" onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false) }} className="relative rounded-xl p-2.5 text-brand-muted transition hover:bg-brand-pink-light hover:text-brand-primary" aria-label="Notificações">
                <Bell size={20} />
                {!readNotifications && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-pink" />}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-14 w-80 rounded-2xl border border-brand-border bg-white p-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-brand-ink">Notificações</h3>
                    <button type="button" onClick={() => setReadNotifications(true)} className="text-xs font-bold text-brand-primary">Marcar como lidas</button>
                  </div>
                  <div className="mt-4 space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.title} className="border-b border-brand-border pb-3 last:border-0">
                        <p className="text-sm font-bold text-brand-ink">{notification.title}</p>
                        <p className="mt-1 text-xs leading-5 text-brand-muted">{notification.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button type="button" onClick={() => openModal('settings')} className="rounded-xl p-2.5 text-brand-muted transition hover:bg-brand-pink-light hover:text-brand-primary" aria-label="Configurações">
              <Settings size={20} />
            </button>

            <div className="relative">
              <button type="button" onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false) }} className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-brand-background">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-pink-light text-sm font-bold text-brand-primary">
                  {userName.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                </div>
                <span className="hidden text-sm font-bold text-brand-ink sm:block">{userName}</span>
                <ChevronDown size={16} className="hidden text-brand-muted sm:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 top-14 w-52 rounded-2xl border border-brand-border bg-white p-2 shadow-xl">
                  <button type="button" onClick={() => { setProfileOpen(false); openModal('settings') }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-brand-muted hover:bg-brand-background">
                    <Settings size={17} />
                    Preferências
                  </button>
                  <button type="button" onClick={() => window.location.href = '/login'} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-brand-danger hover:bg-red-50">
                    <LogOut size={17} />
                    Sair da conta
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-9">
          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-bold text-brand-primary">Olá, {userName.split(' ')[0]}!</p>
              <h1 className="text-2xl font-extrabold text-brand-dark sm:text-3xl">{getSectionTitle()}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-brand-muted">{getSectionDescription()}</p>
            </div>
            {activeSection === 'Rotina' && (
              <button type="button" onClick={() => openModal(role === 'familiar' ? 'reminder' : 'record')} className="rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white hover:bg-brand-dark">
                <Plus className="mr-2 inline" size={17} />
                {profile.primaryAction}
              </button>
            )}
          </div>

          {renderSection()}

          <p className="mt-8 text-center text-xs text-brand-muted">
            Cuidar+ · Dados demonstrativos para visualização da interface.
          </p>
        </main>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-brand-dark">
                  {modal === 'reminder' && 'Novo lembrete'}
                  {modal === 'record' && 'Adicionar registro'}
                  {modal === 'appointment' && 'Novo compromisso'}
                  {modal === 'settings' && 'Configurações'}
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  {modal === 'settings' ? 'Preferências de demonstração.' : 'Preencha as informações abaixo.'}
                </p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-xl p-2 text-brand-muted hover:bg-brand-background" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            {modal === 'settings' ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-brand-background p-4">
                  <p className="font-bold text-brand-ink">Acessibilidade</p>
                  <p className="mt-1 text-sm text-brand-muted">As preferências avançadas de contraste e tamanho de texto ainda precisam ser integradas.</p>
                </div>
                <div className="rounded-xl bg-brand-background p-4">
                  <p className="font-bold text-brand-ink">Privacidade e compartilhamento</p>
                  <p className="mt-1 text-sm text-brand-muted">O gerenciamento real de permissões depende da integração com a API.</p>
                </div>
                <button type="button" onClick={closeModal} className="w-full rounded-xl bg-brand-primary px-5 py-3 font-bold text-white">Fechar</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-brand-ink">Título</label>
                  <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none transition focus:border-brand-primary" placeholder="Digite um título" />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-brand-ink">Área de cuidado</label>
                  <select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} className="w-full rounded-xl border border-brand-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-primary">
                    {categories.map((category) => <option key={category}>{category}</option>)}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-bold text-brand-ink">Descrição</label>
                  <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={3} className="w-full resize-none rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-brand-primary" placeholder="Adicione detalhes, se necessário." />
                </div>

                {modal !== 'record' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-brand-ink">Data</label>
                      <input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="w-full rounded-xl border border-brand-border px-3 py-3 text-sm outline-none focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-brand-ink">Horário</label>
                      <input type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} className="w-full rounded-xl border border-brand-border px-3 py-3 text-sm outline-none focus:border-brand-primary" />
                    </div>
                  </div>
                )}

                {modal === 'appointment' && (
                  <div>
                    <label className="mb-2 block text-sm font-bold text-brand-ink">Local</label>
                    <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none focus:border-brand-primary" placeholder="Local do compromisso" />
                  </div>
                )}

                {message && <p className="rounded-xl bg-brand-pink-light p-3 text-sm font-semibold text-brand-primary">{message}</p>}

                <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                  <button type="button" onClick={closeModal} className="rounded-xl border border-brand-border px-5 py-3 text-sm font-bold text-brand-muted hover:bg-brand-background">Cancelar</button>
                  <button type="submit" className="rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white hover:bg-brand-dark">Salvar</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function MetricCard({ icon: Icon, label, value, detail }: { icon: LucideIcon; label: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-brand-border bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-pink-light text-brand-primary">
          <Icon size={21} />
        </div>
      </div>
      <p className="mt-5 text-sm font-semibold text-brand-muted">{label}</p>
      <p className="mt-1 text-3xl font-extrabold text-brand-dark">{value}</p>
      <p className="mt-1 text-xs text-brand-muted">{detail}</p>
    </div>
  )
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-brand-border bg-white p-8 text-center">
      <ClipboardList className="mx-auto text-brand-light" size={30} />
      <h3 className="mt-3 font-bold text-brand-ink">{title}</h3>
      <p className="mt-1 text-sm text-brand-muted">{description}</p>
    </div>
  )
}