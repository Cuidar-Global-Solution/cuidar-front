
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  LogOut,
  Settings,
  UserRound,
  X,
} from 'lucide-react'

type Task = {
  id: number
  title: string
  time: string
  completed: boolean
}

type Appointment = {
  id: number
  title: string
  date: string
  time: string
  completed: boolean
}

type Props = {
  tasks: Task[]
  appointments: Appointment[]
  onOpenSettings: () => void
}

type Preferences = {
  taskReminders: boolean
  appointmentReminders: boolean
  showEmail: boolean
  largerText: boolean
  reducedMotion: boolean
}

const initialPreferences: Preferences = {
  taskReminders: true,
  appointmentReminders: true,
  showEmail: true,
  largerText: false,
  reducedMotion: false,
}

function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
  })
}

export default function DashboardControls({
  tasks,
  appointments,
}: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [readNotifications, setReadNotifications] = useState<string[]>([])
  const [preferences, setPreferences] =
    useState<Preferences>(initialPreferences)

  const notifications = [
    ...(preferences.taskReminders
      ? tasks
          .filter((task) => !task.completed)
          .map((task) => ({
            id: `task-${task.id}`,
            title: task.title,
            description: `Tarefa pendente · ${task.time}`,
            type: 'task' as const,
          }))
      : []),
    ...(preferences.appointmentReminders
      ? appointments
          .filter((appointment) => !appointment.completed)
          .map((appointment) => ({
            id: `appointment-${appointment.id}`,
            title: appointment.title,
            description: `${formatDate(appointment.date)} · ${appointment.time}`,
            type: 'appointment' as const,
          }))
      : []),
  ]

  const unreadCount = notifications.filter(
    (notification) => !readNotifications.includes(notification.id),
  ).length

  function openSettings() {
    setSettingsOpen(true)
    setNotificationsOpen(false)
    setProfileOpen(false)
  }

  function openNotifications() {
    setNotificationsOpen(true)
    setSettingsOpen(false)
    setProfileOpen(false)
  }

  function togglePreference(key: keyof Preferences) {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }))
  }

  function markAsRead(id: string) {
    setReadNotifications((current) =>
      current.includes(id) ? current : [...current, id],
    )
  }

  function markAllAsRead() {
    setReadNotifications(notifications.map((notification) => notification.id))
  }

  function closeAll() {
    setSettingsOpen(false)
    setNotificationsOpen(false)
    setProfileOpen(false)
  }

  function Switch({
    label,
    description,
    preference,
  }: {
    label: string
    description: string
    preference: keyof Preferences
  }) {
    const enabled = preferences[preference]

    return (
      <div className="flex items-center justify-between gap-4 border-b border-brand-border py-4 last:border-0">
        <div>
          <p className="text-sm font-bold text-brand-dark">{label}</p>
          <p className="mt-1 text-xs text-brand-muted">{description}</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={label}
          onClick={() => togglePreference(preference)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            enabled ? 'bg-brand-primary' : 'bg-brand-border'
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
              enabled ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notificações"
          aria-expanded={notificationsOpen}
          onClick={openNotifications}
          className="relative rounded-xl border border-brand-border p-2.5 text-brand-muted transition hover:bg-brand-background"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-pink px-1 text-[10px] font-extrabold text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        <div className="hidden h-9 w-px bg-brand-border sm:block" />

        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => {
              setProfileOpen((current) => !current)
              setSettingsOpen(false)
              setNotificationsOpen(false)
            }}
            aria-expanded={profileOpen}
            aria-haspopup="true"
            className="flex items-center gap-2 rounded-xl p-1.5 text-left transition hover:bg-brand-background"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-lavender/30 text-xs font-extrabold text-brand-primary">
              AM
            </div>
            <div>
              <p className="text-xs font-extrabold text-brand-dark">
                Ana Martins
              </p>
              <p className="text-[10px] text-brand-muted">Familiar</p>
            </div>
            <ChevronDown
              size={15}
              className={`text-brand-muted transition ${
                profileOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-2xl border border-brand-border bg-brand-surface p-3 shadow-xl">
              <div className="border-b border-brand-border px-3 pb-3">
                <p className="text-sm font-extrabold text-brand-dark">
                  Ana Martins
                </p>
                <p className="mt-1 text-xs text-brand-muted">Familiar</p>
                {preferences.showEmail && (
                  <p className="mt-1 text-xs text-brand-muted">
                    ana@email.com
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={openSettings}
                className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-background hover:text-brand-primary"
              >
                <Settings size={17} />
                Configurações
              </button>

              <Link
                to="/login"
                onClick={closeAll}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-brand-danger transition hover:bg-brand-danger/10"
              >
                <LogOut size={17} />
                Sair da conta
              </Link>
            </div>
          )}
        </div>
      </div>

      {settingsOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto bg-brand-ink/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-settings-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Preferências da conta
                </p>
                <h2
                  id="dashboard-settings-title"
                  className="mt-1 font-heading text-xl font-bold text-brand-dark"
                >
                  Configurações
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  Personalize sua experiência no Cuidar+.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                aria-label="Fechar configurações"
                className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-background"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-2">
                <Bell size={17} className="text-brand-primary" />
                <h3 className="text-sm font-extrabold text-brand-dark">
                  Lembretes
                </h3>
              </div>
              <Switch
                label="Tarefas de cuidado"
                description="Exibir notificações de tarefas pendentes."
                preference="taskReminders"
              />
              <Switch
                label="Compromissos"
                description="Exibir notificações da agenda."
                preference="appointmentReminders"
              />
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2">
                <UserRound size={17} className="text-brand-primary" />
                <h3 className="text-sm font-extrabold text-brand-dark">
                  Privacidade
                </h3>
              </div>
              <Switch
                label="Exibir e-mail no perfil"
                description="Mostrar o e-mail no menu da conta."
                preference="showEmail"
              />
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2">
                <Settings size={17} className="text-brand-primary" />
                <h3 className="text-sm font-extrabold text-brand-dark">
                  Acessibilidade
                </h3>
              </div>
              <Switch
                label="Texto ampliado"
                description="Aumentar o tamanho dos textos do painel."
                preference="largerText"
              />
              <Switch
                label="Reduzir animações"
                description="Diminuir transições e movimentos da interface."
                preference="reducedMotion"
              />
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-brand-border pt-5 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={() => setPreferences(initialPreferences)}
                className="rounded-xl px-4 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-background"
              >
                Restaurar padrões
              </button>
              <button
                type="button"
                onClick={() => setSettingsOpen(false)}
                className="rounded-xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      {notificationsOpen && (
        <div className="fixed inset-0 z-70 flex items-center justify-center overflow-y-auto bg-brand-ink/50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="dashboard-notifications-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-xl sm:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-pink">
                  Acompanhe as atualizações
                </p>
                <h2
                  id="dashboard-notifications-title"
                  className="mt-1 font-heading text-xl font-bold text-brand-dark"
                >
                  Notificações
                </h2>
                <p className="mt-1 text-sm text-brand-muted">
                  {unreadCount > 0
                    ? `${unreadCount} notificações não lidas`
                    : 'Você está em dia com as notificações.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setNotificationsOpen(false)}
                aria-label="Fechar notificações"
                className="rounded-lg p-2 text-brand-muted transition hover:bg-brand-background"
              >
                <X size={20} />
              </button>
            </div>

            {notifications.length > 0 ? (
              <>
                <div className="mt-5 max-h-[50vh] space-y-3 overflow-y-auto">
                  {notifications.map((notification) => {
                    const isRead = readNotifications.includes(notification.id)
                    const Icon =
                      notification.type === 'task' ? Clock3 : CalendarDays

                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 rounded-xl border p-4 ${
                          isRead
                            ? 'border-brand-border bg-brand-surface'
                            : 'border-brand-lavender/50 bg-brand-background'
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-lavender/30 text-brand-primary">
                          <Icon size={18} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-extrabold text-brand-dark">
                            {notification.title}
                          </p>
                          <p className="mt-1 text-xs text-brand-muted">
                            {notification.description}
                          </p>
                          {!isRead && (
                            <button
                              type="button"
                              onClick={() => markAsRead(notification.id)}
                              className="mt-2 text-xs font-extrabold text-brand-primary hover:text-brand-pink"
                            >
                              Marcar como lida
                            </button>
                          )}
                          {isRead && (
                            <p className="mt-2 text-xs font-bold text-brand-success">
                              Lida
                            </p>
                          )}
                        </div>
                        {!isRead && (
                          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-pink" />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex flex-col-reverse gap-3 border-t border-brand-border pt-5 sm:flex-row sm:justify-between">
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-brand-muted transition hover:bg-brand-background disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Marcar todas como lidas
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotificationsOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark"
                  >
                    <Check size={16} />
                    Concluir
                  </button>
                </div>
              </>
            ) : (
              <div className="py-10 text-center">
                <Bell
                  size={32}
                  className="mx-auto text-brand-muted/50"
                />
                <p className="mt-3 text-sm font-extrabold text-brand-dark">
                  Nenhuma notificação
                </p>
                <p className="mt-1 text-xs text-brand-muted">
                  Quando houver tarefas ou compromissos pendentes, eles
                  aparecerão aqui.
                </p>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="mt-5 rounded-xl bg-brand-primary px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-dark"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
