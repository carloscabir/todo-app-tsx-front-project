import { FILTERS_BUTTONS } from '../consts/todos'
import { type HandlerFilterChange as HandlerFilterChangeType, type FilterValue } from '../types/todos'

interface Props {
  filterSelected: FilterValue
  onFilterChange: HandlerFilterChangeType
}

export const Filters: React.FC<Props> = ({ filterSelected, onFilterChange }) => {
  return (
    <ul className="filters">
      {
        Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
          const isSelected = filterSelected === key
          const className = isSelected ? 'selected' : ''

          return (
            <li key={key}>
              <a
                href={href}
                className={className}
                onClick={(e) => {
                  e.preventDefault()
                  onFilterChange(key as FilterValue)
                }}
              >
                { literal }
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}
