import { ApiError, apiFetch } from './api'
import type { PermissaoCuidado } from './pessoasAcompanhadas'

export type VinculoProfissional = {
  id: number
  pessoaAcompanhadaId: number
  profissionalId: number
  nomeProfissional: string
  permissao: PermissaoCuidado
  autorizacao: 'PENDENTE' | 'ATIVO' | 'REVOGADO'
}

const meus = '/vinculos-profissionais/meus'
const daPessoa = (id: number) => `/pessoas-acompanhadas/${id}/vinculos-profissionais`

async function conferir(response: Response) {
  if (response.ok) return response
  const erro = await response.json().catch(() => null)
  throw new ApiError(response.status, typeof erro?.mensagem === 'string'
    ? erro.mensagem
    : `Não foi possível concluir a operação de vínculo (HTTP ${response.status}).`)
}

export async function listarVinculos(token: string, signal: AbortSignal, pessoaId?: number): Promise<VinculoProfissional[]> {
  return (await conferir(await apiFetch(pessoaId === undefined ? meus : daPessoa(pessoaId), { signal }, token))).json()
}

async function alterar(
  caminho: string, method: 'POST' | 'PUT' | 'DELETE', token: string, signal: AbortSignal,
  dados?: { email?: string; permissao: PermissaoCuidado },
) {
  await conferir(await apiFetch(caminho, {
    method,
    signal,
    ...(dados && { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dados) }),
  }, token))
}

export async function convidarProfissional(id: number, email: string, permissao: PermissaoCuidado, token: string, signal: AbortSignal) {
  try {
    await alterar(daPessoa(id), 'POST', token, signal, { email, permissao })
  } catch (erro) {
    if (erro instanceof ApiError && erro.status === 409) {
      throw new ApiError(409, 'Já existe um vínculo ativo ou pendente para este profissional.')
    }
    throw erro
  }
}

export function mudarPermissaoProfissional(id: number, vinculo: number, permissao: PermissaoCuidado, token: string, signal: AbortSignal) {
  return alterar(`${daPessoa(id)}/${vinculo}/permissao`, 'PUT', token, signal, { permissao })
}

export function revogarVinculoProfissional(id: number, vinculo: number, token: string, signal: AbortSignal) {
  return alterar(`${daPessoa(id)}/${vinculo}`, 'DELETE', token, signal)
}

export function aceitarConvite(vinculo: number, token: string, signal: AbortSignal) {
  return alterar(`${meus}/${vinculo}/aceitar`, 'POST', token, signal)
}
