import { type AddTodo as AddTodoType } from '../types/todos'
import { CreateTodo } from './CreateTodo'

interface Props {
  onAddTodo: AddTodoType
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className='header'>
      <h1>
        todo
        <img
          style={{ width: '60px', height: 'auto' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="ts-img" />
      </h1>

      <CreateTodo saveTodo={ onAddTodo } />
    </header>
  )
}

// First part finished!
// Todo: EDIT PART
// Animations
// Refactor Hook
// Read ENV
// Sync with Backend
