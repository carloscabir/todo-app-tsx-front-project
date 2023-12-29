/* eslint-disable */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Definir un tipo y despues incluirlo a una interfaz
// export type TodoTitle = string;

export type TodoId = Pick<Todo, "id">;
export type TodoTitle = Pick<Todo, "title">;
export type TodoCompleted = Pick<Todo, "completed">;

export type RemoveTodo = ({id: TodoId}) => void

export type OnToggleCompletedTodo = ({
  id: TodoId,
  completed: TodoCompleted,
}) => void;

export type AddTodo = ({ title }: TodoTitle) => void

export type EditTitle= ({ 
  id: TodoId,
  title: TodoTitle
}) => void

export type HandlerFilterChange = (filter: FilterValueType) => void

export type RemoveAllCompleted = () => void

export type ListOfTodos = Todo[];

export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]