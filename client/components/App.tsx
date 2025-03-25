import { useState } from 'react'
import AddTodo from './AddTodo.tsx'
import TodoList from './TodoList.tsx'
import { useTodo } from '../hooks/useTodo.ts'

function App() {
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const { data: todos, mutate: updateTodos } = useTodo()

  const handleFilterChange = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter)
  }

  const handleClearCompleted = () => {
    if (todos) {
      const incompleteTodos = todos.filter((todo) => !todo.isComplete)
      updateTodos(incompleteTodos) // Update the todos state with only incomplete ones
    }
  }

  return (
    <>
      <header className="header">
        <h1>todos</h1>
        <AddTodo />
      </header>
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
          >
            Clear completed
          </button>
        </div>
      </footer>
    </>
  )
}

export default App
