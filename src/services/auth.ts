import { ApiError, apiFetch } from './api'

export const dashboards = {
  FAMILIAR: '/dashboard/familiar',
  PROFISSIONAL: '/dashboard/cuidador',
  ACOMPANHADO: '/dashboard/pessoa',
} as const

export type Perfil = keyof typeof dashboards

type Conta = {
  id: number
  nome: string
  email: string
  perfil: Perfil
}

type Credenciais = { email: string; senha: string }

function contaValida(conta: unknown): conta is Conta {
  if (typeof conta !== 'object' || conta === null) return false
  const { id, nome, email, perfil } = conta as Partial<Conta>
  return typeof id === 'number' && typeof nome === 'string' && typeof email === 'string'
    && (perfil === 'FAMILIAR' || perfil === 'PROFISSIONAL' || perfil === 'ACOMPANHADO')
}

function enviarJson(path: string, dados: Credenciais) {
  return apiFetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  })
}

export async function cadastrarConta(dados: Credenciais & { nome: string; perfil: Perfil }) {
  const resposta = await enviarJson('/auth/cadastro', dados)
  if (resposta.status === 409) throw new ApiError(409, 'Este e-mail já está cadastrado.')
  if (resposta.status !== 201) {
    const erro = await resposta.json().catch(() => null)
    throw new ApiError(resposta.status, erro?.mensagem || `Não foi possível criar a conta (HTTP ${resposta.status}).`)
  }
}

export async function autenticar(dados: Credenciais) {
  const resposta = await enviarJson('/auth/login', dados)
  if (resposta.status === 401) throw new ApiError(401, 'E-mail ou senha incorretos.')
  if (!resposta.ok) throw new ApiError(resposta.status, `Não foi possível entrar (HTTP ${resposta.status}).`)
  const { token, conta } = await resposta.json()
  if (typeof token !== 'string' || !token || !contaValida(conta)) {
    throw new Error('A API retornou uma sessão inválida.')
  }
  return { token, conta }
}

export async function consultarSessao(token: string, signal: AbortSignal) {
  const resposta = await apiFetch('/auth/sessao', { signal }, token)
  if (!resposta.ok) throw new ApiError(resposta.status, `Não foi possível consultar a sessão (HTTP ${resposta.status}).`)
  const conta: unknown = await resposta.json()
  if (!contaValida(conta)) throw new Error('A API retornou uma conta inválida.')
  return conta
}

export async function revogarSessao(token: string) {
  const resposta = await apiFetch('/auth/logout', { method: 'POST' }, token)
  if (resposta.status !== 204) throw new ApiError(resposta.status, `HTTP ${resposta.status}`)
}
