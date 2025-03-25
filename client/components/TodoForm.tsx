import { useState, FormEvent, ChangeEvent } from 'react'
import { TodoData } from '../../model/Todo'
import '../styles/TodoForm.scss'

interface Props extends TodoData {
  submitLabel: string
  onSubmit: (_: TodoData) => void
}

export default function TodoForm({
  task,
  isComplete,
  priority,
  isFun,
  dueDate,
  submitLabel,
  onSubmit,
}: Props) {
  const [formState, setFormState] = useState<TodoData>({
    task,
    isComplete: isComplete ?? false, // Ensure isComplete has a default value
    priority: priority ?? 1, // Ensure priority has a default value
    isFun: isFun ?? false, // Ensure isFun is always a boolean
    dueDate,
  })

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = evt.target
    setFormState((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (evt.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    onSubmit(formState) // Ensure `onSubmit` receives properly structured `TodoData`
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <label className="label">Task</label>
      <input
        type="text"
        id="task"
        name="task"
        placeholder="Enter task"
        onChange={handleChange}
        value={formState.task}
      />

      <label className="label">Priority</label>
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

      <label className="label">Due Date</label>
      <input
        type="date"
        id="dueDate"
        name="dueDate"
        onChange={handleChange}
        value={formState.dueDate}
      />

      <label>
        <input
          type="checkbox"
          name="isFun"
          checked={formState.isFun}
          onChange={handleChange}
        />
        Is this fun?
      </label>

      {/* New Is Complete Checkbox */}
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
    </form>
  )
}
