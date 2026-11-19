import RedeApoio from './RedeApoio'
import RotinaCuidados from './RotinaCuidados'
import { useEffect, useState, type FormEvent } from 'react'
import CadastroPessoa from '../CadastroPessoa'
import { useSession } from '../../auth/Session'
import { ApiError } from '../../services/api'
import { listarRegistrosDaConta, statusLabels, type RegistroCuidado } from '../../services/registrosCuidado'
import PreferenciasPessoa from './PreferenciasPessoa'
import { usePessoasAcompanhadas } from './usePessoasAcompanhadas'
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  ShieldAlert,
  UsersRound,
  X,
  FileText,
  AlertTriangle,
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

type Appointment = {
  id: number
  title: string
  category: string
  date: string
  time: string
  location: string
}

type ProfileConfig = {
  title: string
  description: string
  navigation: { label: Section; icon: LucideIcon }[]
  greeting: string
  overview: string
}

const profiles: Record<DashboardRole, ProfileConfig> = {
  familiar: {
    title: 'Área da família',
    description: 'Organize e acompanhe os cuidados.',
    greeting: 'Como estão os cuidados hoje?',
    overview: 'Acompanhe a rotina, os compromissos e os registros de quem você acompanha.',
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
    overview: 'Consulte os atendimentos, acompanhe as tarefas autorizadas e registre os cuidados realizados.',
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
    overview: 'Consulte seus compromissos, acompanhe sua rotina e escolha o que deseja compartilhar.',
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

function getToday() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(date: string) {
  if (!date) return ''
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

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

function PessoasAcompanhadas({ token }: { token: string }) {
  const { pessoas, setPessoas, carregando, erro } = usePessoasAcompanhadas(token)

  return (
    <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
      <h3 className="font-bold text-brand-ink">Pessoas acompanhadas</h3>
      <div className="mt-4" aria-live="polite" aria-busy={carregando}>
        {carregando && (
          <p className="text-sm text-brand-muted">Carregando pessoas acompanhadas...</p>
        )}
        {erro && (
          <p role="alert" className="text-sm text-brand-danger">
            {erro}
          </p>
        )}
        {!carregando && !erro && pessoas.length === 0 && (
          <p className="text-sm text-brand-muted">Nenhuma pessoa acompanhada encontrada.</p>
        )}
        {pessoas.length > 0 && (
          <ul className="space-y-2 text-sm font-semibold text-brand-ink">
            {pessoas.map((pessoa) => (
              <li key={pessoa.id} className="wrap-break-word">{pessoa.nome}</li>
            ))}
          </ul>
        )}
      </div>
      <CadastroPessoa
        disabled={carregando}
        onCadastrada={(pessoa) => setPessoas((atuais) => [...atuais, pessoa])}
      />
    </section>
  )
}

export default function Dashboard({ role }: DashboardProps) {
  const profile = profiles[role]
  const { sessao, sair, expirar } = useSession()
  const userName = sessao?.conta.nome ?? ''
  const [saindo, setSaindo] = useState(false)
  const [erroLogout, setErroLogout] = useState('')

  async function encerrarSessao() {
    if (saindo) return
    setSaindo(true)
    setErroLogout('')
    try {
      await sair()
    } catch (error) {
      setErroLogout(`Não foi possível revogar a sessão. ${(error as Error).message}`)
    } finally {
      setSaindo(false)
    }
  }

  const [activeSection, setActiveSection] = useState<Section>('Início')
  const [appointments, setAppointments] = useState(initialAppointments)
  const token = sessao?.token
  const [resumo, setResumo] = useState<{ token: string; registros: RegistroCuidado[]; erro?: string } | null>(null)
  const registrosDaConta = resumo?.token === token ? resumo : null
  const records = registrosDaConta?.registros ?? []
  const resumoDisponivel = registrosDaConta !== null && !registrosDaConta.erro
  const [modal, setModal] = useState<'appointment' | 'settings' | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [readNotifications, setReadNotifications] = useState(false)
  const [message, setMessage] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Medicamentos',
    date: getToday(),
    time: '',
    location: '',
  })

  useEffect(() => {
    if (!token || (activeSection !== 'Início' && activeSection !== 'Histórico' && !notificationsOpen)) return
    let controller: AbortController | undefined
    function atualizar() {
      const atual = new AbortController()
      controller?.abort()
      controller = atual
      if (!token) return
      listarRegistrosDaConta(token, atual.signal)
        .then((registros) => {
          if (!atual.signal.aborted) setResumo({ token, registros })
        })
        .catch((error: unknown) => {
          if (atual.signal.aborted) return
          if (error instanceof ApiError && error.status === 401) expirar(token)
          else setResumo({ token, registros: [], erro: error instanceof Error ? error.message : 'Falha ao carregar registros.' })
        })
    }
    atualizar()
    window.addEventListener('focus', atualizar)
    const intervalo = window.setInterval(atualizar, 10000)
    return () => {
      controller?.abort()
      window.removeEventListener('focus', atualizar)
      window.clearInterval(intervalo)
    }
  }, [token, expirar, activeSection, notificationsOpen])

  const pendingTasks = records.filter(({ status }) => status === 'PENDENTE')
  const completedTasks = records.filter(({ status }) => status === 'CONCLUIDO' || status === 'TOMADA')
  const overdueTasks = pendingTasks.filter(({ dataPrevista }) => dataPrevista && new Date(dataPrevista).getTime() < Date.now())
  const completion = records.length ? Math.round((completedTasks.length / records.length) * 100) : 0
  const notifications = pendingTasks.filter(({ dataPrevista }) => dataPrevista).map((registro) => {
    const data = new Date(registro.dataPrevista as string)
    const atrasado = data.getTime() < Date.now()
    return {
      id: registro.id,
      title: atrasado ? 'Atividade atrasada' : 'Lembrete pendente',
      description: registro.titulo + ' · ' + data.toLocaleString('pt-BR'),
      type: atrasado ? 'overdue' : 'pending',
    }
  })

  function changeSection(section: Section) {
    setActiveSection(section)
    setMobileMenuOpen(false)
    setNotificationsOpen(false)
    setProfileOpen(false)
  }

  function openModal(type: 'appointment' | 'settings') {
    setForm({
      title: '',
      description: '',
      category: 'Medicamentos',
      date: getToday(),
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!form.title.trim()) {
      setMessage('Informe um título.')
      return
    }

    if (modal === 'appointment') {
      if (!form.date || !form.time) {
        setMessage('Informe a data e o horário.')
        return
      }

      if (new Date(`${form.date}T${form.time}:00`).getTime() < Date.now()) {
        setMessage('Escolha uma data e horário futuros.')
        return
      }
    }

    if (modal === 'appointment') {
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

    setMessage('Compromisso adicionado apenas a esta demonstração.')
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
      'Rede de apoio': role === 'cuidador' ? 'Consulte seus convites e vínculos profissionais.' : 'Consulte o acesso profissional ao cuidado.',
      Emergência: 'Consulte os contatos de confiança e as orientações para pedir ajuda.',
    }

    return descriptions[activeSection]
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

  function renderRecords(itens = records) {
    if (!registrosDaConta) return <p role="status" className="text-sm text-brand-muted">Carregando registros...</p>
    if (registrosDaConta.erro) return <p role="alert" className="text-sm text-brand-danger">{registrosDaConta.erro}</p>
    if (!itens.length) return <EmptyState title="Nenhum registro" description="Os registros autorizados aparecerão aqui." />
    return (
      <div className="space-y-3">
        {itens.map((record) => {
          const data = record.dataRealizado ?? record.dataPrevista
          return (
            <div key={record.id} className="rounded-2xl border border-brand-border bg-white p-5">
              <div className="flex flex-col justify-between gap-2 sm:flex-row">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wide text-brand-primary">
                    {statusLabels[record.status] ?? record.status}
                  </span>
                  <h3 className="mt-1 font-bold text-brand-ink">{record.titulo}</h3>
                  {record.detalhe && <p className="mt-2 text-sm text-brand-muted">{record.detalhe}</p>}
                </div>
                {data && <time dateTime={data} className="text-sm text-brand-muted">{new Date(data).toLocaleString('pt-BR')}</time>}
              </div>
            </div>
          )
        })}
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
          <MetricCard icon={ClipboardList} label="Atividades" value={resumoDisponivel ? String(records.length) : '—'} detail="Na rotina cadastrada" />
          <MetricCard icon={Check} label="Concluídas" value={resumoDisponivel ? String(completedTasks.length) : '—'} detail="Atividades registradas" />
          <MetricCard icon={AlertTriangle} label="Atrasadas" value={resumoDisponivel ? String(overdueTasks.length) : '—'} detail="Precisam de atenção" />
          <MetricCard icon={CalendarDays} label="Compromissos" value={String(appointments.length)} detail="Na agenda demonstrativa" />
        </div>

        {role === 'familiar' && sessao && <PessoasAcompanhadas key={sessao.token} token={sessao.token} />}

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-brand-ink">Progresso da rotina</h3>
                <p className="mt-1 text-sm text-brand-muted">Atividades marcadas como concluídas</p>
              </div>
              <span className="text-xl font-bold text-brand-primary">{resumoDisponivel ? `${completion}%` : '—'}</span>
            </div>
            <div className="mt-5 h-3 overflow-hidden rounded-full bg-brand-pink-light">
              <div className="h-full rounded-full bg-brand-primary transition-all" style={{ width: `${completion}%` }} />
            </div>
            <div className="mt-6 flex items-center justify-between text-sm">
              <span className="text-brand-muted">{resumoDisponivel ? completedTasks.length : '—'} concluídas</span>
              <span className="font-semibold text-brand-ink">{resumoDisponivel ? pendingTasks.length : '—'} pendentes</span>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
            <h3 className="font-bold text-brand-ink">Próximos compromissos · demonstração</h3>
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
          {renderRecords(records.slice(0, 5))}
        </section>
      </div>
    )
  }

  function renderSection() {
    if (activeSection === 'Início') return renderOverview()

    if (activeSection === 'Rotina') {
      return sessao && <RotinaCuidados key={sessao.token} token={sessao.token} perfil={role} />
    }

    if (activeSection === 'Agenda') {
      return (
        <div className="space-y-5">
          <p className="text-sm text-brand-muted">Agenda demonstrativa. Os compromissos adicionados ficam nesta página até a recarga.</p>
          <button type="button" onClick={() => openModal('appointment')} className="rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white hover:bg-brand-dark">
            <Plus className="mr-2 inline" size={17} />
            Novo compromisso
          </button>
          {renderAppointments()}
        </div>
      )
    }

    if (activeSection === 'Histórico') return renderRecords()
    if (activeSection === 'Rede de apoio') return sessao && <RedeApoio key={sessao.token} token={sessao.token} perfil={role} />
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
                {!readNotifications && notifications.length > 0 && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-pink" />}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 top-14 z-30 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-brand-border bg-white p-4 shadow-xl">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-brand-ink">Notificações</h3>
                    <button type="button" onClick={() => setReadNotifications(true)} className="text-xs font-bold text-brand-primary">Marcar como lidas nesta página</button>
                  </div>
                  <div className="mt-4 space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="border-b border-brand-border pb-3 last:border-0">
                        <p className={`text-sm font-bold ${notification.type === 'overdue' ? 'text-brand-danger' : 'text-brand-ink'}`}>{notification.title}</p>
                        <p className="mt-1 text-xs leading-5 text-brand-muted">{notification.description}</p>
                      </div>
                    ))}
                    {!registrosDaConta && <p role="status" className="py-3 text-sm text-brand-muted">Carregando notificações...</p>}
                    {registrosDaConta?.erro && <p role="alert" className="py-3 text-sm text-brand-danger">{registrosDaConta.erro}</p>}
                    {resumoDisponivel && !notifications.length && <p className="py-3 text-sm text-brand-muted">Nenhuma notificação no momento.</p>}
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
                <div className="absolute right-0 top-14 z-30 w-52 rounded-2xl border border-brand-border bg-white p-2 shadow-xl">
                  <button type="button" onClick={() => { setProfileOpen(false); openModal('settings') }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-brand-muted hover:bg-brand-background">
                    <Settings size={17} />
                    Preferências
                  </button>
                  <button type="button" onClick={encerrarSessao} disabled={saindo} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-brand-danger hover:bg-red-50">
                    <LogOut size={17} />
                    {saindo ? 'Saindo...' : 'Sair da conta'}
                  </button>
                  {erroLogout && <p role="alert" className="px-3 pb-2 text-sm text-brand-danger">{erroLogout}</p>}
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
          </div>

          {renderSection()}

          <p className="mt-8 text-center text-xs text-brand-muted">
            Cuidar+
          </p>
        </main>
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
          <div className="my-auto w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-brand-dark">
                  {modal === 'appointment' && 'Novo compromisso'}
                  {modal === 'settings' && 'Configurações'}
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  {modal === 'settings' ? 'Preferências de acessibilidade por pessoa.' : 'Preencha as informações abaixo.'}
                </p>
              </div>
              <button type="button" onClick={closeModal} className="rounded-xl p-2 text-brand-muted hover:bg-brand-background" aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            {modal === 'settings' ? (
              sessao && <PreferenciasPessoa key={sessao.token} token={sessao.token} familiar={role === 'familiar'} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-bold text-brand-ink">Título</label>
                  <input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} className="w-full rounded-xl border border-brand-border px-4 py-3 text-sm outline-none transition focus:border-brand-primary" placeholder="Digite um título" />
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

                {modal === 'appointment' && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-bold text-brand-ink">Data</label>
                      <input required type="date" min={getToday()} value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} className="w-full rounded-xl border border-brand-border px-3 py-3 text-sm outline-none focus:border-brand-primary" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-bold text-brand-ink">Horário</label>
                      <input required type="time" value={form.time} onChange={(event) => setForm({ ...form, time: event.target.value })} className="w-full rounded-xl border border-brand-border px-3 py-3 text-sm outline-none focus:border-brand-primary" />
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
