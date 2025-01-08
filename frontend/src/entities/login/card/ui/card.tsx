import { Button } from '@/shared/ui/native/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/native/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/native/form'
import { Input } from '@/shared/ui/native/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { formSchema } from '../model/schema'
import { useLogin } from '../shared/api/login'
import { useNavigate, Navigate } from 'react-router-dom'
import { LoginFormData } from '../model/types'
import { useDispatch } from 'react-redux'
import { setUser } from '@/modules/register/store/slice'
import Cookies from 'js-cookie'

export const LoginCard = () => {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const { mutate: loginUser, isPending } = useLogin({
    onSuccess: async (response) => {
      if (response.token) {
        Cookies.set('token', response.token, { expires: 7 })
      }

      dispatch(setUser(response.user))

      toast.success('Login successful')

      form.reset({
        identifier: '',
        password: '',
      })

      await new Promise((resolve) => setTimeout(resolve, 100))
      navigate('/')
    },
    onError: (error) => {
      toast.error(error?.['response']?.data?.message)
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData: LoginFormData = {
      ...values,
    }

    loginUser(formData)
  }

  if (Cookies.get('token')) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[750px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please fill in the form to login</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Username or Email&nbsp;
                        <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your username or email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>
                        Password <span className="text-red-600">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-3">
                <Button
                  type="button"
                  variant="outline"
                  disabled={isPending}
                  onClick={() => {
                    navigate('/')
                    form.reset()
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
