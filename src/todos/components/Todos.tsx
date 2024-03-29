import { useState } from 'react'
import {
  type OnToggleCompletedTodo as OnToggleCompletedTodoType,
  type ListOfTodos,
  type EditTitle as EditTitleType,
  type RemoveTodo as RemoveTodoType
} from '../types/todos'
import { Todo } from './Todo'
import { useAutoAnimate } from '@formkit/auto-animate/react'

// Actually, I have two different ways to manage the following events. I have one that I'm managing OnRemoveTodo here BUT I'm NOT reusing a certain function type for all of them
// On the other hand, I'm reusing the same function type for onToggleCompletedTodo, in the way that I'm just calling the function type but handling the event in the lowest child -that is Todo.tsx-!
// They are just ways of how I could do this. But it doesn't matter anyways. I think you should use just one way to manage them, though!

interface Props {
  todos: ListOfTodos
  onToggleCompletedTodo: OnToggleCompletedTodoType
  onRemoveTodo: RemoveTodoType
  onUpdateTitle: EditTitleType
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo, onToggleCompletedTodo, onUpdateTitle }) => {
  const [isEditing, setIsEditing] = useState<string | unknown>('')

  const [parent] = useAutoAnimate()
  return (
    <ul className='todo-list' ref={ parent }>
      {todos.length > 0
        ? todos.map(todo => (
        <li
          key={todo._id}
          onDoubleClick={() => { setIsEditing(todo._id) }}
          className={`
          ${todo.completed ? 'completed' : ''}
          ${isEditing === todo._id ? 'editing' : ''}
          `}
        >
          <Todo
            key={todo._id}
            _id={todo._id}
            title={todo.title}
            completed={todo.completed}
            onToggleCompletedTodo={onToggleCompletedTodo}
            onRemoveTodo={() => {
              onRemoveTodo({ id: todo._id })
                .then(res => res)
                .catch(err => { console.log(err) })
            }}
            onUpdateTitle={onUpdateTitle}
            isEditing={isEditing === todo._id}
            setIsEditing={setIsEditing}
          />
        </li>
        ))
        : <li><label>No hay nada que hacer aun!</label></li>
    }
    </ul>
  )
}
