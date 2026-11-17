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

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080'
).replace(/\/+$/, '')

export async function cadastrarPessoaAcompanhada(
  dados: PessoaAcompanhadaRequest,
): Promise<PessoaAcompanhada> {
  let response: Response
  try {
    response = await fetch(`${apiBaseUrl}/pessoas-acompanhadas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    })
  } catch {
    throw new Error('Não foi possível conectar à API. Verifique a conexão e tente novamente.')
  }

  if (response.status !== 201) {
    const erro = await response.json().catch(() => null)
    const mensagem = typeof erro?.mensagem === 'string'
      ? erro.mensagem
      : `Não foi possível cadastrar a pessoa (HTTP ${response.status}).`
    const detalhes = Array.isArray(erro?.detalhes)
      ? erro.detalhes.filter((detalhe: unknown) => typeof detalhe === 'string')
      : []
    throw new Error([mensagem, ...detalhes].join('\n'))
  }

  return response.json()
}

export async function listarPessoasAcompanhadas(
  signal: AbortSignal,
): Promise<PessoaAcompanhada[]> {
  const response = await fetch(`${apiBaseUrl}/pessoas-acompanhadas`, { signal })

  if (!response.ok) {
    throw new Error(`Erro ao consultar pessoas acompanhadas: ${response.status}`)
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
