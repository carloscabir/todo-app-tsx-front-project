import {
  type RemoveAllCompleted as RemoveAllCompletedType,
  type FilterValue,
  type HandlerFilterChange as HandlerFilterChangeType
} from '../types/todos'
import { Filters } from './Filters'

interface Props {
  activeCount: number
  completedCount: number
  filterSelected: FilterValue
  onClearCompleted: RemoveAllCompletedType
  handleFilterChange: HandlerFilterChangeType
}

export const Footer: React.FC<Props> = ({
  activeCount = 0,
  completedCount = 0,
  filterSelected,
  onClearCompleted,
  handleFilterChange
}) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{ activeCount }</strong> tareas pendientes
      </span>
      <Filters
        filterSelected={ filterSelected }
        onFilterChange={handleFilterChange}
      />
      {
        completedCount > 0 && (
          <button
            className='clear-completed'
            onClick={() => { onClearCompleted() }}>
            Borrar completados
          </button>
        )
      }
    </footer>
  )
}
