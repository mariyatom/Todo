export interface TodoData {
  task: string
  isComplete: boolean
  priority?: number
  isFun?: boolean
  dueDate?: string
  createdAt?: string
  updateAt?: string
}

export interface Todo extends TodoData {
  id: number
}
export interface idAddTodo {
  id: number
}
