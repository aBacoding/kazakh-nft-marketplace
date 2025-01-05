import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import api from '@/shared/api/axios'
import { RegisterFormData } from '../../model/types'

export const useRegister = (
  options?: UseMutationOptions<any, Error, RegisterFormData>
) => {
  return useMutation({
    mutationFn: (data: RegisterFormData) =>
      api.post('/api/auth/register', data).then((res) => res.data),
    ...options,
  })
}
