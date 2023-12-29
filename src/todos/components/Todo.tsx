import { useEffect, useRef, useState } from 'react'
import {
  type Todo as TodoType,
  type OnToggleCompletedTodo as OnToggleCompletedTodoType,
  type EditTitle as EditTitleType,
  type TodoId as TodoIdType
} from '../types/todos'

// Reutilizando Interface de Todo
// type Props = TodoType

interface Props extends TodoType {
  onToggleCompletedTodo: OnToggleCompletedTodoType
  onRemoveTodo: () => void
  onUpdateTitle: EditTitleType
  setIsEditing: (id: TodoIdType | unknown) => void
  isEditing?: boolean
}

// type PropsWithoutId = Omit<Props, 'id'>

export const Todo: React.FC<Props> = ({
  id,
  title,
  completed,
  onToggleCompletedTodo,
  onRemoveTodo,
  onUpdateTitle,
  setIsEditing,
  isEditing = false
}) => {
  const [editedTitle, setEditedTitle] = useState(title)
  const inputEditTitle = useRef<HTMLInputElement>(null)

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompletedTodo({
      id,
      completed: e.target.checked
    })
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      setEditedTitle(title.trim())

      if (editedTitle !== title) { onUpdateTitle({ id, title: editedTitle }) }

      if (editedTitle === '') onRemoveTodo()
      setIsEditing('')
    }

    if (e.key === 'Escape') {
      setEditedTitle(title)
      setIsEditing('')
    }
  }

  useEffect(() => {
    inputEditTitle.current?.focus()
  }, [isEditing])

  return (
    <>
    <div className="view">
      <input
        className="toggle"
        checked={completed}
        type="checkbox"
        onChange={handleChangeCheckbox}
      />
      <label>{title}</label>
      <button
        className="destroy"
        onClick={() => {
          onRemoveTodo()
        }}
      ></button>
      </div>
      <input
        type="text"
        className='edit'
        value={editedTitle}
        onChange={(e) => { setEditedTitle(e.target.value) }}
        onKeyDown={handleKeyDown}
        onBlur={() => { setIsEditing('') }}
        ref={inputEditTitle}
      />
    </>
  )
}
