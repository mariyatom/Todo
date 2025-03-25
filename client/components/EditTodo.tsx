import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import { useDeleteTodo, useTodoById, useUpdateTodo } from '../hooks/useTodo'
import { TodoData } from '../../model/Todo'

export default function EditTodo() {
  const { id } = useParams()
  const todoId = Number(id)
  const navigate = useNavigate()
  const { data: todo, isPending } = useTodoById(todoId)
  const updateTodo = useUpdateTodo()
  const deleteTodo = useDeleteTodo()
  const [formState, setFormState] = useState<TodoData | null>(null)

  useEffect(() => {
    if (todo) setFormState(todo)
  }, [todo])

  if (isPending || !formState) {
    return <p>Loading...</p>
  }

  const handleSubmit = async (updatedTodo: TodoData) => {
    await updateTodo.mutateAsync({ ...updatedTodo, id: todoId })
    navigate('/') // Redirect to todo list
  }

  const handleDelete = async (id: number) => {
    await deleteTodo.mutateAsync(id) // Call the delete function from the custom hook
    navigate('/') // Redirect to todo list after deleting
  }

  return (
    <TodoForm
      {...formState}
      submitLabel="Update Task"
      onSubmit={handleSubmit}
      onDelete={handleDelete} // Pass the handleDelete function
      id={todoId} // Pass the todo's ID for deletion
    />
  )
}
