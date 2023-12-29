import { useState } from 'react'
import { type AddTodo as AddTodoType } from '../types/todos'

interface Props {
  saveTodo: AddTodoType
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputvalue] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    saveTodo({ title: inputValue })
    setInputvalue('')
  }

  return (
    <form onSubmit={handleSubmit}>
    <input
      type="text"
      className='new-todo'
      value={inputValue}
      onChange={(e) => { setInputvalue(e.target.value) }}
      placeholder='¿Qué quieres hacer?'
      autoFocus
      />
      </form>
  )
}
