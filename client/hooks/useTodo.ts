import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import * as API from '../apis/apiClient'
import { Tododata } from '../../model/Todo'

export function useTodo() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: API.fetchTodos,
  })
}

export function useCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Tododata) => {
      const result = await API.createTodos(data)
      return result
    },
    onSuccess: async () => {
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
