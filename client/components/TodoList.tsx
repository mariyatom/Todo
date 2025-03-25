import { useTodo } from '../hooks/useTodo'
import '../styles/TodoList.scss'

export default function TodoList() {
  const { isPending, isError, data: todos } = useTodo()

  if (isPending) {
    return <p className="loading">Loading...</p>
  }
  if (isError) {
    return <p className="error">Woopsie, something went wrong!</p>
  }

  return (
    <div className="todo-container">
      <h2 className="todo-header">Todo List</h2>
      <ul className="todo-list">
        {todos?.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div className="todo-content">
              <span
                className={`todo-task ${todo.isComplete ? 'completed' : ''}`}
              >
                {todo.task}
              </span>
              <p className="todo-status">
                {todo.isComplete ? 'Completed' : 'Pending'}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
