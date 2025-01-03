import { useQuery, useMutation } from '@tanstack/react-query'
import apiClient from '@/shared/api/axios'

export const useApi = ({ url, method = 'GET', options = {} }) => {
  if (method === 'GET') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useQuery({
      queryKey: [url],
      queryFn: () => apiClient.get(url).then((res) => res.data),
      ...options,
    })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useMutation({
    mutationFn: (data) => {
      switch (method) {
        case 'POST':
          return apiClient.post(url, data).then((res) => res.data)
        case 'PUT':
          return apiClient.put(url, data).then((res) => res.data)
        case 'DELETE':
          return apiClient.delete(url, { data }).then((res) => res.data)
        default:
          throw new Error(`Unsupported method: ${method}`)
      }
    },
  })
}
