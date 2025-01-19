import apiClient from '@/shared/api/axios'
import { useQuery } from '@tanstack/react-query'
import { UserData } from '../model/types'

const USER_ENDPOINT = '/api/auth/me'

export const useGetUser = (options) => {
  return useQuery<UserData>({
    queryKey: ['userData'],
    queryFn: () => apiClient.get(USER_ENDPOINT).then((res) => res.data),
    ...options,
  })
}
