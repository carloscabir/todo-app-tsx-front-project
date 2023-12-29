import { Todos } from './todos/components/Todos'
import { Footer } from './todos/components/Footer'
import { Header } from './todos/components/Header'
import { useTodos } from './todos/hooks/useTodo'

const App = (): JSX.Element => {
  const {
    todos,
    toggleCompletedTodo,
    removeTodo,
    updateTitleTodo,
    handlerFilterChange,
    removeAllCompleted,
    completedCount,
    activeCount,
    addTodo,
    filterSelected
  } = useTodos()

  return (
    <div className='todoapp'>
      <Header onAddTodo={addTodo} />
      <Todos
        todos={todos}
        onToggleCompletedTodo= { toggleCompletedTodo }
        onRemoveTodo={ removeTodo }
        onUpdateTitle={updateTitleTodo}
        />
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={removeAllCompleted}
        handleFilterChange={handlerFilterChange}
      />
    </div>
  )
}

export default App
