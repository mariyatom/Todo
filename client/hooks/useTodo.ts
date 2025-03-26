import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/apiClient'
import { Todo, TodoData } from '../../model/Todo'

export function useTodo() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: API.fetchTodos,
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: TodoData) => {
      const result = await API.createTodos(data)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error: Error) => {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('An unknown error occurred while creating a todo')
      }
    },
  })
}
export function useTodoById(id?: number) {
  return useQuery({
    queryKey: ['todo', id], // Use a unique query key for each todo
    queryFn: async () => {
      if (!id) throw new Error('Todo ID is required')
      return API.fetchTodoById(id) // Fetch a specific todo from API,
    },
    enabled: !!id, // Only fetch when ID is available,!!id: This is a common trick in JavaScript to coerce a value into a boolean. It converts a value into true or false
  })
}

export function useUpdateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedTodo: Todo) => {
      return API.updateTodo(updatedTodo.id, updatedTodo)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

// Hook to archive all completed todos
export const useArchiveCompletedTodos = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      return API.archiveCompletedTodos()
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] }) // Refetch todos to see the changes
    },
  })
}

export function useDeleteTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: API.deleteTodoById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: (error) => {
      console.error('Error deleting todo:', error)
    },
  })
}
