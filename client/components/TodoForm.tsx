import { useState, FormEvent, ChangeEvent, useEffect } from 'react'
import { TodoData } from '../../model/Todo'
import { Trash2 } from 'lucide-react'
import '../styles/TodoForm.scss'

interface Props extends TodoData {
  submitLabel: string
  onSubmit: (_: TodoData) => void
  onDelete: (_: number) => void
  id: number
}

export default function TodoForm({
  task,
  isComplete,
  priority,
  isFun,
  dueDate,
  submitLabel,
  onSubmit,
  onDelete,
  id,
}: Props) {
  const [formState, setFormState] = useState<TodoData>({
    task,
    isComplete: isComplete ?? false,
    priority: priority ?? 1,
    isFun: isFun ?? false,
    dueDate,
  })

  useEffect(() => {
    const storedData = localStorage.getItem(`todo-${id}`)
    if (storedData) {
      setFormState(JSON.parse(storedData))
    }
  }, [id])

  useEffect(() => {
    localStorage.setItem(`todo-${id}`, JSON.stringify(formState))
  }, [formState, id])

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = evt.target
    const updatedValue =
      type === 'checkbox' ? (evt.target as HTMLInputElement).checked : value

    setFormState((prev) => ({
      ...prev,
      [name]: updatedValue,
    }))
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    onSubmit(formState)
  }

  const formattedDueDate =
    formState.dueDate &&
    new Date(formState.dueDate).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <label className="label" htmlFor="task">
          Task
        </label>
        <input
          type="text"
          id="task"
          name="task"
          placeholder="Enter task"
          onChange={handleChange}
          value={formState.task}
        />

        <label className="label" htmlFor="priority">
          Priority
        </label>
        <select
          id="priority"
          name="priority"
          value={formState.priority}
          onChange={handleChange}
        >
          {[1, 2, 3].map((value) => (
            <option key={value} value={value}>{`${value}`}</option>
          ))}
        </select>

        <label className="label" htmlFor="dueDate">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          onChange={handleChange}
          value={formState.dueDate}
        />
        <p>{formattedDueDate}</p>

        <label>
          <input
            type="checkbox"
            name="isFun"
            checked={formState.isFun}
            onChange={handleChange}
          />
          Is this fun?
        </label>

        <label>
          <input
            type="checkbox"
            name="isComplete"
            checked={formState.isComplete}
            onChange={handleChange}
          />
          Mark as complete
        </label>

        <button>{submitLabel}</button>

        <button
          type="button"
          className="delete-button"
          onClick={() => onDelete(id)}
        >
          <Trash2 size={18} /> Delete
        </button>
      </form>
    </>
  )
}
