export interface Todo {
  _id: string
  title: string
  completed: boolean
  timeStamp: string
  __v: number
}

export type ListOfTodos = Todo[]

export type TodoId = Pick<Todo, 'id'>
export type TodoTitle = Pick<Todo, 'title'>
export type TodoCompleted = Pick<Todo, 'completed'>

// Handlers for Todo Components
export type AddTodo = ({ title: TodoTItle }) => Promise<void>

export type OnToggleCompletedTodo = ({
  id: TodoId,
  completed: TodoCompleted
}) => Promise<void>

export type EditTitle = ({
  id: TodoId,
  title: TodoTitle
}) => Promise<void>

export type RemoveTodo = ({ id: TodoId }) => Promise<void>

export type RemoveAllCompleted = () => Promise<void>

export type HandlerFilterChange = (filter: FilterValueType) => void

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]

// Types for useTodo.ts
export type useTodos = () => {
  todos: ListOfTodosType | null
  toggleCompletedTodo: ToggleCompletedTodoType
  addTodo: AddTodoType
  updateTitleTodo: EditTitleType
  removeTodo: RemoveTodoType
  removeAllCompleted: RemoveAllCompletedType
  handlerFilterChange: HandlerFilterChangeType
  filterSelected: FilterValueType
  completedCount: number
  activeCount: number
  error: string | null
}

// Types for useFetchTodos.mts
export type ErrorType = string | null
export type LoadingType = boolean

export type Url = string

export interface APIResponse {
  ok: boolean
  message: string
  response: ListOfTodos | Todo | object | null
}

export interface APIResponseUpdateTodo {
  ok: boolean
  message: string
  response: Todo
}

// Types for fething functions/hooks
export type FetchAllTodos = ({ url }: { url: Url }) => {
  todos: ListOfTodos | null
  isLoading: LoadingType
  error: ErrorType
}

export type FetchToggleTodo = (
  { url, completed }:
  { url: Url, completed: TodoCompleted }
) => Promise<{
  updatedTodo?: Todo | null
  error: Error | null
  ok: boolean
}>

export type FetchCreateTodo = (
  { url, title }:
  { url: Url, title: TodoTitle }
) => Promise<{
  createdTodo: Todo | null
  error: Error | null
  ok: boolean
}>

export type FetchEditTitle = (
  { url, title }:
  { url: Url, title: TodoTitle }
) => Promise<void>

export type FetchDeleteTodo = (
  { url }:
  { url: Url }
) => Promise<void>

export type FetchDeleteAllCompletedTodos = ({ url }: { url: Url }) => Promise<void>
