import { ApiError, apiFetch } from './api'

export const statusLabels = {
  PENDENTE: 'Pendente',
  TOMADA: 'Tomada',
  NAO_TOMADA: 'Não tomada',
  SEM_CONFIRMACAO: 'Sem confirmação',
  CONCLUIDO: 'Concluído',
} as const

export type StatusRegistro = keyof typeof statusLabels

export type DadosRegistro = {
  areaId: number
  titulo: string
  detalhe: string | null
  dataPrevista: string | null
  dataRealizado: string | null
  status: StatusRegistro
  usuarioRealizouId?: number | null
  medicamentoId?: number | null
  consultaId?: number | null
  medida?: number | null
  medida2?: number | null
  unidade?: string | null
}

export type RegistroCuidado = DadosRegistro & { id: number; pessoaAcompanhadaId: number }

export type AreaCuidado = { id: number; nome: string; descricao: string | null }

async function conferirResposta(response: Response, acao: string) {
  if (response.ok) return
  const erro = await response.json().catch(() => null)
  const mensagem = typeof erro?.mensagem === 'string' && erro.mensagem
    ? erro.mensagem
    : `Não foi possível ${acao} (HTTP ${response.status}).`
  const detalhes = Array.isArray(erro?.detalhes)
    ? erro.detalhes.filter((detalhe: unknown) => typeof detalhe === 'string')
    : []
  throw new ApiError(response.status, [mensagem, ...detalhes].join(' '))
}

export async function listarRegistrosDaConta(token: string, signal: AbortSignal): Promise<RegistroCuidado[]> {
  const response = await apiFetch('/registros-cuidado', { signal }, token)
  await conferirResposta(response, 'carregar os registros')
  return response.json()
}

export async function listarRegistrosCuidado(
  pessoaId: number,
  token: string,
  signal: AbortSignal,
): Promise<RegistroCuidado[]> {
  const response = await apiFetch(`/pessoas-acompanhadas/${pessoaId}/registros`, { signal }, token)
  await conferirResposta(response, 'carregar os registros')
  return response.json()
}

export async function listarAreasDaPessoa(pessoaId: number, token: string, signal: AbortSignal): Promise<AreaCuidado[]> {
  const response = await apiFetch(`/pessoas-acompanhadas/${pessoaId}/areas-cuidado`, { signal }, token)
  await conferirResposta(response, 'carregar as áreas de cuidado')
  return response.json()
}

export async function listarCatalogoAreas(token: string, signal: AbortSignal): Promise<AreaCuidado[]> {
  const response = await apiFetch('/areas-cuidado', { signal }, token)
  await conferirResposta(response, 'carregar o catálogo de áreas')
  return response.json()
}

export async function habilitarAreaDaPessoa(pessoaId: number, areaId: number, token: string, signal: AbortSignal) {
  const response = await apiFetch(`/pessoas-acompanhadas/${pessoaId}/areas-cuidado`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ areaId }),
    signal,
  }, token)
  await conferirResposta(response, 'habilitar a área')
}

export async function salvarRegistroCuidado(
  pessoaId: number, dados: DadosRegistro, token: string, registroId?: number,
): Promise<RegistroCuidado> {
  const editando = registroId !== undefined
  const caminho = editando
    ? `/registros-cuidado/${registroId}`
    : `/pessoas-acompanhadas/${pessoaId}/registros`
  const response = await apiFetch(caminho, {
    method: editando ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(editando ? { ...dados, pessoaAcompanhadaId: pessoaId } : dados),
  }, token)
  await conferirResposta(response, 'salvar o registro')
  return response.json()
}

export async function excluirRegistroCuidado(registroId: number, token: string) {
  const response = await apiFetch(`/registros-cuidado/${registroId}`, { method: 'DELETE' }, token)
  await conferirResposta(response, 'excluir o registro')
}
