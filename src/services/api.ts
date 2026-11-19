const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080'
).replace(/\/+$/, '')

export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function apiFetch(path: string, options: RequestInit = {}, token?: string) {
  const headers = new Headers(options.headers)
  if (token) headers.set('Authorization', `Bearer ${token}`)

  try {
    return await fetch(`${apiBaseUrl}${path}`, { ...options, headers, credentials: 'omit' })
  } catch (error) {
    if (options.signal?.aborted) throw error
    throw new Error('Não foi possível conectar à API. Verifique a conexão e tente novamente.')
  }
}
