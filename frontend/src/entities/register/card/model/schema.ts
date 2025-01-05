import { z } from 'zod'

export const formSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    username: z
      .string()
      .min(4, { message: 'Username must be at least 4 characters' }),
    first_name: z
      .string()
      .min(2, { message: 'First name must be at least 2 characters' }),
    last_name: z
      .string()
      .min(2, { message: 'Last name must be at least 2 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Password must contain at least one special character',
      }),
    password_confirm: z.string(),
    iin: z
      .string()
      .length(12, { message: 'IIN must be 12 characters' })
      .refine(
        (iin) => {
          const yearPrefix = parseInt(iin.substring(0, 2))
          const month = parseInt(iin.substring(2, 4))
          const day = parseInt(iin.substring(4, 6))

          if (month < 1 || month > 12) {
            return false
          }

          const fullYear =
            yearPrefix >= 0 && yearPrefix <= 23
              ? 2000 + yearPrefix
              : 1900 + yearPrefix

          const daysInMonth = new Date(fullYear, month, 0).getDate()

          if (day < 1 || day > daysInMonth) {
            return false
          }

          return true
        },
        { message: 'Invalid date in IIN' }
      ),
    avatar: z
      .instanceof(File)
      .refine(
        (file) => {
          if (!file) return true
          return file.type.startsWith('image/')
        },
        { message: 'Avatar must be an image file' }
      )
      .optional(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Passwords don't match",
    path: ['password_confirm'],
  })
