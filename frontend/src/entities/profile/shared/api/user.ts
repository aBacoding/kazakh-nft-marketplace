import apiClient from '@/shared/api/axios'
import api from '@/shared/api/axios'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query'
import { UserData } from '../model/types'

const USER_ENDPOINT = '/api/auth/me'
const PROFILE_ENDPOINT = '/api/auth/profile'

export const useGetUser = (options) => {
  return useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: () => apiClient.get(USER_ENDPOINT).then((res) => res.data),
    ...options,
  })
}

export const useUpdateUser = (
  options?: UseMutationOptions<any, Error, UserData>
) => {
  return useMutation({
    mutationFn: (data: UserData) =>
      api.patch(PROFILE_ENDPOINT, data).then((res) => res.data),
    ...options,
  })
}
