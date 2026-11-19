import { ApiError, apiFetch } from './api'

export type PessoaAcompanhada = {
  id: number
  nome: string
}

export type PessoaAcompanhadaRequest = {
  nome: string
  dataNascimento: string
  observacao: string | null
  tamanhoFonte: number
  altoContraste: 'S' | 'N'
  usuarioId: number | null
}

export type DetalhePessoaAcompanhada = PessoaAcompanhada & PessoaAcompanhadaRequest
export type PermissaoCuidado = 'VISUALIZAR' | 'REGISTRAR'

export async function consultarPermissaoPessoa(id: number, token: string, signal: AbortSignal): Promise<PermissaoCuidado> {
  const response = await apiFetch(`/pessoas-acompanhadas/${id}/permissoes`, { signal }, token)
  if (!response.ok) {
    const erro = await response.json().catch(() => null)
    throw new ApiError(response.status, typeof erro?.mensagem === 'string'
      ? erro.mensagem
      : `Não foi possível consultar a permissão (HTTP ${response.status}).`)
  }
  const dados = await response.json()
  if (dados?.permissao !== 'VISUALIZAR' && dados?.permissao !== 'REGISTRAR') {
    throw new Error('A API retornou uma permissão inválida.')
  }
  return dados.permissao
}

async function conferirDetalhe(response: Response): Promise<DetalhePessoaAcompanhada> {
  if (response.ok) return response.json()
  const erro = await response.json().catch(() => null)
  throw new ApiError(response.status, typeof erro?.mensagem === 'string'
    ? erro.mensagem
    : `Não foi possível acessar as preferências (HTTP ${response.status}).`)
}

export async function consultarPessoaAcompanhada(id: number, token: string, signal: AbortSignal) {
  return conferirDetalhe(await apiFetch(`/pessoas-acompanhadas/${id}`, { signal }, token))
}

export async function atualizarPreferenciasPessoa(
  id: number,
  preferencias: Pick<PessoaAcompanhadaRequest, 'tamanhoFonte' | 'altoContraste'>,
  token: string,
  signal: AbortSignal,
) {
  const { nome, dataNascimento, observacao, usuarioId } = await consultarPessoaAcompanhada(id, token, signal)
  return conferirDetalhe(await apiFetch(`/pessoas-acompanhadas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, dataNascimento, observacao, usuarioId, ...preferencias }),
    signal,
  }, token))
}

export async function cadastrarPessoaAcompanhada(
  dados: PessoaAcompanhadaRequest,
  token: string,
): Promise<PessoaAcompanhada> {
  const response = await apiFetch('/pessoas-acompanhadas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  }, token)

  if (response.status !== 201) {
    const erro = await response.json().catch(() => null)
    const mensagem = typeof erro?.mensagem === 'string'
      ? erro.mensagem
      : `Não foi possível cadastrar a pessoa (HTTP ${response.status}).`
    const detalhes = Array.isArray(erro?.detalhes)
      ? erro.detalhes.filter((detalhe: unknown) => typeof detalhe === 'string')
      : []
    throw new ApiError(response.status, [mensagem, ...detalhes].join('\n'))
  }

  return response.json()
}

export async function listarPessoasAcompanhadas(
  token: string,
  signal: AbortSignal,
): Promise<PessoaAcompanhada[]> {
  const response = await apiFetch('/pessoas-acompanhadas', { signal }, token)

  if (!response.ok) {
    throw new ApiError(response.status, `Não foi possível carregar as pessoas acompanhadas (HTTP ${response.status}).`)
  }

  const pessoas: unknown = await response.json()
  if (
    !Array.isArray(pessoas) ||
    !pessoas.every(
      (pessoa) =>
        pessoa !== null &&
        typeof pessoa === 'object' &&
        typeof pessoa.id === 'number' &&
        typeof pessoa.nome === 'string',
    )
  ) {
    throw new Error('Resposta inválida ao consultar pessoas acompanhadas')
  }

  return pessoas
}
