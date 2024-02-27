import {
  type FetchToggleTodo,
  type FetchCreateTodo,
  type FetchEditTitle,
  type FetchDeleteTodo,
  type FetchDeleteAllCompletedTodos,
  type APIResponseUpdateTodo
} from '../types/todos'

export const fetchCreateTodo: FetchCreateTodo = async ({ url, title }) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })

    if (!res.ok) { throw new Error('Error fetching data') }

    const json = await res.json() as APIResponseUpdateTodo

    const { response } = json

    return {
      createdTodo: response,
      error: null,
      ok: true
    }
  } catch (err) {
    console.log(`Error creating todo: ${err as string}`)
    return {
      createdTodo: null,
      error: err as Error,
      ok: false
    }
  }
}

export const fetchUpdateTitleTodo: FetchEditTitle = async ({ url, title }) => {
  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })

    if (!response.ok) { throw new Error('Error updating todo') }
  } catch (err) {
    console.log(`Error updating todo: ${err as string}`)
  }
}

// Todo: Fix this
export const fetchToggleCompletedTodo: FetchToggleTodo = async ({ url, completed }) => {
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    })

    if (!res.ok) { throw new Error(`Error updating todo: ${res.statusText}`) }

    const json = await res.json() as APIResponseUpdateTodo
    const { response } = json

    if (response == null) { throw new Error('Error updating todo') }

    return ({
      updatedTodo: response,
      ok: true,
      error: null
    })
  } catch (err) {
    console.log(`Error toggling completed: ${err as string}`)

    return {
      uptadedTodo: null,
      error: err as Error,
      ok: false
    }
  }
}

export const fetchDeleteTodo: FetchDeleteTodo = async ({ url }) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) { throw new Error('Error deleting todo') }
  } catch (err) {
    console.log(`Error deleting todo: ${err as string}`)
  }
}

export const fetchDeleteAllCompletedTodos: FetchDeleteAllCompletedTodos = async ({ url }) => {
  // URL MUST have "deleteAllCompleted=true" as a query, if not, it won't work
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) { throw new Error('Error deleting all todos') }
  } catch (err) {
    console.log(`Error deleting all todos: ${err as string}`)
  }
}
