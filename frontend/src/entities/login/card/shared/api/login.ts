import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import api from '@/shared/api/axios'
import { LoginFormData } from '../../model/types'

export const useLogin = (
  options?: UseMutationOptions<any, Error, LoginFormData>
) => {
  return useMutation({
    mutationFn: (data: LoginFormData) =>
      api.post('/api/auth/login', data).then((res) => res.data),
    ...options,
  })
}
