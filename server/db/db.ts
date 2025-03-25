import { Todo, Tododata } from '../../model/Todo.ts'
import connection from './connection.ts'

export async function getAllTodos(): Promise<Todo[]> {
  return connection('todos').select(
    'id',
    'task',
    'is_complete as isComplete',
    'priority',
    'is_fun as isFun',
    'due_date as dueDate',
    'created_at as createdAt',
    'updated_at as UpdatedAt',
  )
}

export async function addNewTodo(todoData: Tododata): Promise<number> {
  const [idObj] = await connection('todos')
    .insert({
      task: todoData.task,
      is_complete: todoData.isComplete,
      priority: todoData.priority,
      is_fun: todoData.isFun,
      due_date: todoData.dueDate,
    })
    .returning('id')

  return idObj.id
}
