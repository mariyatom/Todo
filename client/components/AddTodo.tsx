// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import { useCreateTodo } from '../hooks/useTodo'

export default function AddTodo() {
  const [task, setTask] = useState('')
  //const { mutate: createTodo } = useCreateTodo()//working
  const createTodo = useCreateTodo()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (task.trim()) {
      const data = {
        task,
        isComplete: false,
        priority: 1,
        isFun: false,
        dueDate: '26th march 2025',
      }
      await createTodo.mutateAsync(data)
      // createTodo(data)
      setTask('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        value={task}
        onChange={(e) => setTask(e.target.value)}
        aria-label="Add a new task"
      />
    </form>
  )
}
