import { useCallback, useEffect, useState } from 'react'
import { useSession } from '../../auth/Session'
import { ApiError } from '../../services/api'
import { consultarPermissaoPessoa, type PermissaoCuidado } from '../../services/pessoasAcompanhadas'

export function usePermissaoPessoa(id: number, token: string) {
  const { expirar } = useSession()
  const [permissao, setPermissao] = useState<PermissaoCuidado | null>(null)
  const [erro, setErro] = useState<Error | null>(null)
  const [revisao, setRevisao] = useState(0)
  const revalidar = useCallback(() => {
    setPermissao(null)
    setRevisao((atual) => atual + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    let consultando = false
    async function atualizar() {
      if (consultando) return
      consultando = true
      try {
        const resultado = await consultarPermissaoPessoa(id, token, controller.signal)
        if (controller.signal.aborted) return
        setPermissao(resultado)
        setErro(null)
      } catch (falha) {
        if (controller.signal.aborted) return
        setPermissao(null)
        if (falha instanceof ApiError && falha.status === 401) expirar(token)
        else setErro(falha instanceof Error ? falha : new Error('Falha ao consultar a permissão.'))
      } finally {
        consultando = false
      }
    }
    void atualizar()
    const intervalo = window.setInterval(atualizar, 5000)
    window.addEventListener('focus', atualizar)
    return () => {
      controller.abort()
      window.clearInterval(intervalo)
      window.removeEventListener('focus', atualizar)
    }
  }, [id, token, expirar, revisao])

  return { permissao, erro, revalidar }
}
