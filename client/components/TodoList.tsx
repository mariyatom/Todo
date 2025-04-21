import { useTodo, useDeleteTodo, useUpdateTodo } from '../hooks/useTodo'
import { useNavigate } from 'react-router-dom'
import { Trash2, Pencil } from 'lucide-react' // Import edit and trash icons
import '../styles/TodoList.scss'
import { ChangeEvent } from 'react'

interface TodoListProps {
  filter: 'all' | 'active' | 'completed'
}
export default function TodoList({ filter }: TodoListProps) {
  const { isPending, isError, data: todos } = useTodo()
  const deleteTodo = useDeleteTodo() // permenent delete
  const updateTodo = useUpdateTodo()

  const navigate = useNavigate()

  if (isPending) return <p className="loading">Loading...</p>
  if (isError) return <p className="error">Woopsie, something went wrong!</p>

  const filteredTodos = todos?.filter((todo) => {
    if (filter === 'completed') {
      return todo.isComplete
    }
    if (todo.isArchived) {
      return false // Don't show archived todos in the main list.
      //  When clicking "Clear Completed," move completed items from the main list to the completed list.
    }

    switch (filter) {
      case 'all':
        return true
      case 'active':
        return !todo.isComplete

      default:
        return true // Default to showing all if filter is unknown
    }
  })

  const toggleComplete = (e: ChangeEvent<HTMLInputElement>, todoId: number) => {
    e.stopPropagation()
    const targetTodo = todos?.find((todo) => todo.id === todoId)
    if (!targetTodo) return
    const updatedTodo = {
      ...targetTodo,
      isComplete: !targetTodo.isComplete,
    }
    updateTodo.mutate(updatedTodo)
  }

  return (
    <div className="todo-container">
      <h2 className="todo-header">Todo List</h2>
      <ul className="todo-list">
        {filteredTodos?.map((todo) => (
          <li key={todo.id} className="todo-item">
            <div
              role="button"
              tabIndex={0}
              aria-label={`Edit todo: ${todo.task}`}
              className="todo-content"
              onDoubleClick={() => navigate(`/edit/${todo.id}`)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  navigate(`/edit/${todo.id}`)
                }
              }}
            >
              <input
                type="checkbox"
                className="toggle"
                checked={todo.isComplete}
                onChange={(evt) => toggleComplete(evt, todo.id)}
                id={`todo-${todo.id}`}
              />
              <label htmlFor={`todo-${todo.id}`}>
                <span
                  className={`todo-task ${todo.isComplete ? 'completed' : ''}`}
                >
                  {todo.task}
                </span>
              </label>

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
                aria-label="Edit task"
              >
                <Pencil size={18} />
                <span className="visually-hidden">Edit task</span>
              </button>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation()
                  deleteTodo.mutate(todo.id)
                }}
                aria-label="Delete task"
              >
                <Trash2 size={18} />
                <span className="visually-hidden">Delete task</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
