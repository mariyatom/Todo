// eslint-disable-next-line no-unused-vars
import { useEffect, useRef, useState } from 'react'
import { useCreateTodo } from '../hooks/useTodo'

export default function AddTodo() {
  const [task, setTask] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  //const { mutate: createTodo } = useCreateTodo() // method 1
  const createTodo = useCreateTodo()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus() // Set focus dynamically
    }
  }, []) // Runs only once when the component mounts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (task.trim()) {
      const today = new Date()
      const formattedDate = today.toLocaleDateString('en-US', {
        month: 'long', // Month as a full name
        day: 'numeric', // Day as a number
        year: 'numeric', // Full year
      }) // Example: "March 26, 2025"

      const data = {
        task,
        isComplete: false,
        priority: 1,
        isFun: false,
        dueDate: formattedDate,
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
        ref={inputRef}
        value={task}
        onChange={(e) => setTask(e.target.value)}
        aria-label="Add a new task"
      />
    </form>
  )
}
