import { useState } from 'react'
import { TODO_FILTERS } from '../consts/todos'
import { mockTodos } from '../mocks'
import {
  type ListOfTodos,
  type OnToggleCompletedTodo as ToggleCompletedTodoType,
  type RemoveTodo as RemoveTodoType,
  type EditTitle as EditTitleType,
  type FilterValue as FilterValueType,
  type AddTodo as AddTodoType,
  type RemoveAllCompleted as RemoveAllCompletedType,
  type HandlerFilterChange as HandlerFilterChangeType
} from '../types/todos'

export const useTodos = (): {
  todos: ListOfTodos
  toggleCompletedTodo: ToggleCompletedTodoType
  addTodo: AddTodoType
  updateTitleTodo: EditTitleType
  removeTodo: RemoveTodoType
  removeAllCompleted: RemoveAllCompletedType
  handlerFilterChange: HandlerFilterChangeType
  filterSelected: FilterValueType
  completedCount: number
  activeCount: number
} => {
  const [todos, setTodos] = useState(mockTodos)

  const [filterSelected, setFilterSelected] = useState<FilterValueType>(TODO_FILTERS.ALL)

  const filteredTodos = todos.filter(todo => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed

    return todo
  })

  const handlerFilterChange: HandlerFilterChangeType = (filter) => { setFilterSelected(filter) }

  /*
  const handleCompleted = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>
    ): void => {
    }
    */
  const toggleCompletedTodo: ToggleCompletedTodoType = ({ id, completed }) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }

      return todo
    })
    setTodos(newTodos)
  }

  const addTodo: AddTodoType = ({ title }): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false
    }

    const newtodos = [...todos, newTodo]
    setTodos(newtodos)
  }

  const updateTitleTodo: EditTitleType = ({ id, title }) => {
    const newTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })
    setTodos(newTodos)
  }

  const removeTodo: RemoveTodoType = ({ id }) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos)
  }

  const removeAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
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
    activeCount
  }
}
