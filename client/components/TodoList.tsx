import { useTodo, useDeleteTodo } from '../hooks/useTodo'
import { useNavigate } from 'react-router-dom'
import { Trash2, Pencil } from 'lucide-react' // Import edit and trash icons
import '../styles/TodoList.scss'

interface TodoListProps {
  filter: 'all' | 'active' | 'completed'
}
export default function TodoList({ filter }: TodoListProps) {
  const { isPending, isError, data: todos } = useTodo()
  const deleteTodo = useDeleteTodo()
  const navigate = useNavigate()

  if (isPending) return <p className="loading">Loading...</p>
  if (isError) return <p className="error">Woopsie, something went wrong!</p>

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'all') {
      return true
    } else if (filter === 'active') {
      return !todo.isComplete
    } else if (filter === 'completed') {
      return todo.isComplete
    }
    return true // Default to showing all if filter is unknown
  })

  return (
    <div className="todo-container">
      <h2 className="todo-header">Todo List</h2>
      <ul className="todo-list">
        {filteredTodos?.map((todo) => (
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
                {todo.isComplete ? 'Completed' : 'Pending'} &nbsp;&nbsp; *** Due
                : {todo?.dueDate ? todo?.dueDate : ''}
              </p>
            </div>
            <div className="todo-actions">
              <button
                className="edit-button"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate(`/edit/${todo.id}`)
                }}
              >
                <Pencil size={18} />
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteTodo.mutate(todo.id)
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
