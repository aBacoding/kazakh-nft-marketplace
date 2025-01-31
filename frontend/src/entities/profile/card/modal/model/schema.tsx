import { z } from 'zod'

export const editProfileFormSchema = z.object({
  avatar: z.any().nullable().optional(),
  email: z.string().email(),
  iin: z.string().length(12, { message: 'IIN must be 12 characters long' }),
  first_name: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters long' }),
  last_name: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters long' }),
  username: z
    .string()
    .min(4, { message: 'Username must be at least 4 characters long' }),
})
