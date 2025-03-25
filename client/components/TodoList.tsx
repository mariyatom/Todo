import { useTodo, useDeleteTodo } from '../hooks/useTodo'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react' // Import trash icon
import '../styles/TodoList.scss'

export default function TodoList() {
  const { isPending, isError, data: todos } = useTodo()
  const deleteTodo = useDeleteTodo()
  const navigate = useNavigate()

  if (isPending) return <p className="loading">Loading...</p>
  if (isError) return <p className="error">Woopsie, something went wrong!</p>

  return (
    <div className="todo-container">
      <h2 className="todo-header">Todo List</h2>
      <ul className="todo-list">
        {todos?.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div
              className="todo-content"
              onClick={() => navigate(`/edit/${todo.id}`)}
            >
              <span
                className={`todo-task ${todo.isComplete ? 'completed' : ''}`}
              >
                {todo.task}
              </span>
              <p className="todo-status">
                {todo.isComplete ? 'Completed' : 'Pending'}
              </p>
            </div>
            <button
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation() // Prevent navigating when clicking delete
                deleteTodo.mutate(todo.id)
              }}
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
