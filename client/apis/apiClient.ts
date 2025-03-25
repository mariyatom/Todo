import request from 'superagent'
import { idAddTodo, Todo, Tododata } from '../../model/Todo'
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
  data: Tododata,
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
