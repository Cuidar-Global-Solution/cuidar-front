import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { ApiError } from '../services/api'
import { autenticar, consultarSessao, dashboards, revogarSessao, type Perfil } from '../services/auth'

const tokenKey = 'cuidar.token'
type Conta = Awaited<ReturnType<typeof consultarSessao>>
type Sessao = { token: string; conta: Conta }
type SessionContext = {
  sessao: Sessao | null
  carregando: boolean
  erro: string
  aviso: string
  tentarNovamente: () => void
  entrar: (email: string, senha: string) => Promise<void>
  sair: () => Promise<void>
  expirar: (token: string) => void
}

const Context = createContext<SessionContext | null>(null)

export function SessionProvider({ children }: { children: ReactNode }) {
  const [tokenInicial] = useState(() => sessionStorage.getItem(tokenKey))
  const [carregando, setCarregando] = useState(Boolean(tokenInicial))
  const [sessao, setSessao] = useState<Sessao | null>(null)
  const [erro, setErro] = useState('')
  const [aviso, setAviso] = useState('')
  const [tentativa, setTentativa] = useState(0)

  useEffect(() => {
    if (!tokenInicial) return
    const controller = new AbortController()
    consultarSessao(tokenInicial, controller.signal)
      .then((conta) => {
        if (!controller.signal.aborted) setSessao({ token: tokenInicial, conta })
      })
      .catch((error: Error) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && error.status === 401) {
          sessionStorage.removeItem(tokenKey)
          setAviso('Sua sessão expirou. Entre novamente.')
        } else {
          setErro(error.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setCarregando(false)
      })
    return () => controller.abort()
  }, [tokenInicial, tentativa])

  async function entrar(email: string, senha: string) {
    const novaSessao = await autenticar({ email, senha })
    sessionStorage.setItem(tokenKey, novaSessao.token)
    setAviso('')
    setSessao(novaSessao)
  }

  const expirar = useCallback((token: string) => {
    if (sessionStorage.getItem(tokenKey) !== token) return
    sessionStorage.removeItem(tokenKey)
    setSessao(null)
    setAviso('Sua sessão expirou. Entre novamente.')
  }, [])

  async function sair() {
    if (!sessao) return
    try {
      await revogarSessao(sessao.token)
      setAviso('')
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) throw error
      setAviso('A API informou que a sessão já está inválida (HTTP 401).')
    }
    sessionStorage.removeItem(tokenKey)
    setSessao(null)
  }

  function tentarNovamente() {
    setErro('')
    setCarregando(true)
    setTentativa((atual) => atual + 1)
  }

  return (
    <Context.Provider value={{ sessao, carregando, erro, aviso, tentarNovamente, entrar, sair, expirar }}>
      {children}
    </Context.Provider>
  )
}

export function useSession() {
  const session = useContext(Context)
  if (!session) throw new Error('SessionProvider ausente.')
  return session
}

export function SessionStatus() {
  const { carregando, erro, tentarNovamente } = useSession()
  return (
    <div className="mx-auto max-w-lg space-y-4 p-6">
      {carregando ? <p role="status">Verificando sessão...</p> : (
        <>
          <p role="alert">{erro}</p>
          <button type="button" onClick={tentarNovamente} className="font-bold text-brand-primary">
            Tentar novamente
          </button>
        </>
      )}
    </div>
  )
}

export function ProtectedDashboard({ perfil }: { perfil: Perfil }) {
  const { sessao, carregando, erro } = useSession()
  if (carregando || erro) return <SessionStatus />
  if (!sessao) return <Navigate to="/login" replace />
  if (sessao.conta.perfil !== perfil) return <Navigate to={dashboards[sessao.conta.perfil]} replace />
  return <Outlet />
}
