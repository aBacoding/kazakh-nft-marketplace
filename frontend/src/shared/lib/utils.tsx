import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
}

export function calculateAgeFromIIN(iin: string): number {
  if (iin.length !== 12) return 0

  const yearPrefix = parseInt(iin.substring(0, 2))
  const month = parseInt(iin.substring(2, 4))
  const day = parseInt(iin.substring(4, 6))

  if (month < 1 || month > 12) return 0

  const fullYear =
    yearPrefix >= 0 && yearPrefix <= 23 ? 2000 + yearPrefix : 1900 + yearPrefix

  const daysInMonth = new Date(fullYear, month, 0).getDate()
  if (day < 1 || day > daysInMonth) return 0

  const birthDate = new Date(fullYear, month - 1, day)
  const today = new Date()

  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--
  }

  return age
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}
