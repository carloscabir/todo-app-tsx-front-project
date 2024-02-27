import { useEffect, useState } from 'react'
import { TODO_FILTERS, MAIN_ENDPOINT } from '../consts/todos'
import {
  type ListOfTodos as ListOfTodosType,
  type OnToggleCompletedTodo as ToggleCompletedTodoType,
  type RemoveTodo as RemoveTodoType,
  type EditTitle as EditTitleType,
  type FilterValue as FilterValueType,
  type AddTodo as AddTodoType,
  type HandlerFilterChange as HandlerFilterChangeType,
  type useTodos as useTodosType
} from '../types/todos'
import { useFetchAllTodos } from './useFetchTodos.mts'
import {
  fetchCreateTodo,
  fetchDeleteAllCompletedTodos,
  fetchDeleteTodo,
  fetchToggleCompletedTodo,
  fetchUpdateTitleTodo
} from '../services/todos.mts'

export const useTodos: useTodosType = () => {
  const [todos, setTodos] = useState<ListOfTodosType | []>([])
  const [filterSelected, setFilterSelected] = useState<FilterValueType>(TODO_FILTERS.ALL)
  const [error, setError] = useState<string | null>(null)
  const { todos: initialTodos, error: initialError } = useFetchAllTodos({ url: MAIN_ENDPOINT })

  useEffect(() => {
    if (initialTodos !== null && initialTodos?.length > 0) {
      setTodos(initialTodos)
    }

    if (initialError != null) {
      setError(initialError)
    }
  }, [initialTodos, initialError])

  const filteredTodos =
    todos.filter(todo => {
      if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
      if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed

      return todo
    })

  const handlerFilterChange: HandlerFilterChangeType = (filter) => { setFilterSelected(filter) }

  const toggleCompletedTodo: ToggleCompletedTodoType = async ({ id, completed }) => {
    const url = `${MAIN_ENDPOINT}/${id}`
    await fetchToggleCompletedTodo({ completed, url })

    const newTodos = todos.map(todo => {
      if (todo._id === id) {
        return { ...todo, completed: !todo.completed }
      }

      return todo
    })
    setTodos(newTodos)
  }

  const addTodo: AddTodoType = async ({ title }) => {
    const { createdTodo, error } = await fetchCreateTodo({ title, url: MAIN_ENDPOINT })

    if (createdTodo == null || error != null) {
      setError('Error al crear el todo'); return
    }

    const newtodos = [...todos, createdTodo]
    setTodos(newtodos)
  }

  const updateTitleTodo: EditTitleType = async ({ id, title }) => {
    const url = `${MAIN_ENDPOINT}/${id}`
    await fetchUpdateTitleTodo({ url, title })

    const newTodos = todos.map(todo => {
      if (todo._id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })
    setTodos(newTodos)
  }

  const removeTodo: RemoveTodoType = async ({ id }) => {
    const newTodos = todos.filter(todo => todo._id !== id)
    setTodos(newTodos)

    const url = `${MAIN_ENDPOINT}/${id}`
    await fetchDeleteTodo({ url })
  }

  const removeAllCompleted = async (): Promise<void> => {
    const url = `${MAIN_ENDPOINT}?deleteAllCompleted=true`
    await fetchDeleteAllCompletedTodos({ url })

    const newTodos = todos?.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const completedCount = todos.length - activeCount

  return {
    todos: filteredTodos,
    toggleCompletedTodo,
    addTodo,
    updateTitleTodo,
    removeTodo,
    removeAllCompleted,
    handlerFilterChange,
    filterSelected,
    completedCount,
    activeCount,
    error
  }
}
