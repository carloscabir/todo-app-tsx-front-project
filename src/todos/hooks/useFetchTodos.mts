import { useEffect, useState } from 'react'
import {
  type APIResponse,
  type ListOfTodos,
  type FetchAllTodos
} from '../types/todos'

export const useFetchAllTodos: FetchAllTodos = ({ url }) => {
  const [todos, setTodos] = useState<ListOfTodos | []>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    const fetchData = async (): Promise<void> => {
      setIsLoading(true)
      try {
        const response = await fetch(url)

        if (!response.ok) { throw new Error('Error al obtener todos. Intenta mas tarde') }
        const json = await response.json() as APIResponse

        if (!signal.aborted) {
          const { response: todos } = json

          if (todos !== null) {
            setTodos(todos as ListOfTodos)
          } else {
            setTodos([])
          }

          setError(null)
        }
      } catch (err) {
        if (!signal.aborted) {
          setError('Error al obtener todos. Revisa tu conexión o intenta mas tarde')
        }
      } finally {
        if (!signal.aborted) {
          setIsLoading(false)
        }
      }
    }
    void fetchData()

    return () => { abortController.abort() }
  }, [url])

  return {
    todos,
    isLoading,
    error
  }
}
