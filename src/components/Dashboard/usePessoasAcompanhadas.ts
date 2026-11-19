import { useCallback, useEffect, useState } from 'react'
import { useSession } from '../../auth/Session'
import { ApiError } from '../../services/api'
import { listarPessoasAcompanhadas, type PessoaAcompanhada } from '../../services/pessoasAcompanhadas'

export function usePessoasAcompanhadas(token: string, acompanharVinculos = false) {
  const { expirar } = useSession()
  const [pessoas, setPessoas] = useState<PessoaAcompanhada[]>([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [revisao, setRevisao] = useState(0)
  const atualizar = useCallback(() => setRevisao((atual) => atual + 1), [])

  useEffect(() => {
    if (!acompanharVinculos) return
    window.addEventListener('focus', atualizar)
    const intervalo = window.setInterval(atualizar, 10000)
    return () => {
      window.removeEventListener('focus', atualizar)
      window.clearInterval(intervalo)
    }
  }, [acompanharVinculos, atualizar])

  useEffect(() => {
    const controller = new AbortController()

    listarPessoasAcompanhadas(token, controller.signal)
      .then((resultado) => {
        if (!controller.signal.aborted) {
          setPessoas(resultado)
          setErro('')
        }
      })
      .catch((error: Error) => {
        if (controller.signal.aborted) return
        if (error instanceof ApiError && error.status === 401) {
          expirar(token)
        } else {
          if (acompanharVinculos) setPessoas([])
          setErro(error.message)
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setCarregando(false)
      })

    return () => controller.abort()
  }, [token, expirar, acompanharVinculos, revisao])

  return { pessoas, setPessoas, carregando, erro, atualizar }
}
