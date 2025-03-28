import { useState } from 'react'
import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'
import { useArchiveCompletedTodos } from '../hooks/useTodo.ts'

function App() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  //const archiveCompletedTodosMutation = useArchiveCompletedTodos()// method 1
  const { mutate: archiveCompletedTodos, isPending: isArchiving } =
    useArchiveCompletedTodos() // methode 2

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter)
  }

  const handleClearCompleted = () => {
    // if (archiveCompletedTodosMutation.mutate) { // method 1
    //   archiveCompletedTodosMutation.mutate()
    // }

    // methode2
    if (archiveCompletedTodos) {
      archiveCompletedTodos()
    }
  }
  return (
    <>
      <div>
        <AddTodo />
      </div>
      <section className="main">
        <TodoList filter={filter} /> {/* Pass the filter prop */}
      </section>
      <footer className="footer">
        <div className="filter-buttons">
          <button
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All
          </button>
          <button
            className={`filter-button ${filter === 'active' ? 'active' : ''}`}
            onClick={() => handleFilterChange('active')}
          >
            Active
          </button>
          <button
            className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('completed')}
          >
            Completed
          </button>
          <button
            className="clear-completed clear-button"
            onClick={handleClearCompleted}
            disabled={isArchiving}
          >
            {isArchiving ? 'Clearing...' : 'Clear completed'}
          </button>
        </div>
      </footer>
    </>
  )
}

export default App
