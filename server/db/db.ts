import { Todo, TodoData } from '../../model/Todo.ts'
import connection from './connection.ts'

export async function getAllTodos(): Promise<Todo[]> {
  return connection('todos')
    .select(
      'id',
      'task',
      'is_complete as isComplete',
      'is_archived as isArchived',
      'priority',
      'is_fun as isFun',
      'due_date as dueDate',
      'created_at as createdAt',
      'updated_at as updatedAt',
    )
    .orderBy('updated_at', 'desc') // Orders in descending order
}

export async function addNewTodo(todoData: TodoData): Promise<number> {
  const idObj = await connection('todos')
    .insert({
      task: todoData.task,
      is_complete: todoData.isComplete ?? false, // Ensure default value
      priority: todoData.priority,
      is_fun: todoData.isFun,
      due_date: todoData.dueDate,
      is_archived: todoData.isArchived ?? false,
    })
    .returning('id')
  const { id } = idObj[0]

  return id
}

export async function getTodoById(id: number): Promise<Todo> {
  const TodoById = await connection('todos')
    .where({ id })
    .select(
      'id',
      'task',
      'is_complete as isComplete',
      'priority',
      'is_fun as isFun',
      'due_date as dueDate',
      'created_at as createdAt',
      'updated_at as updatedAt',
      'is_archived as isArchived',
    )
    .first()
  return TodoById
}

export async function updateTodo(
  id: number,
  updatedTodo: Partial<TodoData>,
): Promise<number | null> {
  return await connection('todos').where({ id }).update({
    task: updatedTodo.task,
    is_complete: updatedTodo.isComplete,
    priority: updatedTodo.priority,
    is_fun: updatedTodo.isFun,
    due_date: updatedTodo.dueDate,
    is_archived: updatedTodo.isArchived, // Allow updating the archive status
  })
}

export async function deleteTodo(id: number): Promise<number> {
  return await connection('todos').where({ id }).del()
}

// Function to update all completed todos to be archived
export async function archiveCompletedTodos(): Promise<number> {
  return await connection('todos')
    .where('is_complete', true)
    .update({ is_archived: true }) // returns a Promise that resolves to the number of rows that were updated in the database.
}
