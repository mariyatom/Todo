import { useTodo } from '../hooks/useTodo'
import { useNavigate } from 'react-router-dom' // Import useNavigate
import '../styles/TodoList.scss'

export default function TodoList() {
  const { isPending, isError, data: todos } = useTodo()
  const navigate = useNavigate()

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
          <li
            key={todo.id}
            className="todo-item"
            onClick={() => navigate(`/edit/${todo.id}`)} // Navigate to edit page
          >
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
