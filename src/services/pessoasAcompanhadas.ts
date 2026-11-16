export type PessoaAcompanhada = {
  id: number
  nome: string
}

const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080'
).replace(/\/+$/, '')

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
