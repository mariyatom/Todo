import request from 'superagent'
import { idAddTodo, Todo, TodoData } from '../../model/Todo'
const rootUrl = '/api/v1'

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const res = await request.get(`${rootUrl}/todos`)

    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while fetching todo')
    }
  }
}

export async function createTodos(
  data: TodoData,
): Promise<idAddTodo | undefined> {
  try {
    const res = await request.post(`${rootUrl}/todos`).send(data)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while creating a todo')
    }
  }
}
export async function fetchTodoById(id: number) {
  const response = await fetch(`${rootUrl}/todos/${id}`)
  if (!response.ok) {
    throw new Error('Failed to fetch todo')
  }
  return response.json()
}

export async function updateTodo(id: number, data: TodoData) {
  try {
    const res = await request.patch(`${rootUrl}/todos/${id}`).send(data)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while updating the todo')
    }
  }
}

export async function archiveCompletedTodos() {
  try {
    console.log('Sending PATCH request to archive completed todos') // Debugging line

    const res = await request.put(`${rootUrl}/todos/archive-completed`)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while updating the todo')
    }
  }
}

export async function deleteTodoById(id: number) {
  try {
    const res = await request.delete(`/api/v1/todos/${id}`)
    return res.body
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    } else {
      throw new Error('An unknown error occurred while deleting the todo')
    }
  }
}
