import { RootState } from '@/app/store/store'
import { setEditProfileModal } from '@/modules/profile'
import { Button } from '@/shared/ui/native/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/native/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/native/form'
import { Input } from '@/shared/ui/native/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { editProfileFormSchema } from '../model'
import { z } from 'zod'
import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/native/avatar'
import { fileToBase64, getInitials } from '@/shared/lib/utils'
import { toast } from 'sonner'
import { useUpdateUser } from '@/entities/profile/shared'
import { Loader2 } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'

export const EditProfileModal = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { state, data } = useSelector(
    (state: RootState) => state.profile.editProfileModal
  )

  const form = useForm<z.infer<typeof editProfileFormSchema>>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      avatar: null,
      email: '',
      iin: data?.['iin'] || '',
      first_name: '',
      last_name: '',
      username: data?.['username'] || '',
    },
  })

  const { mutate: updateUser, isPending } = useUpdateUser({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userData'] })
      toast.success('Profile updated successfully')
      handleClose()
    },
    onError: (error) => {
      toast.error(error?.['response']?.data?.message || error?.['message'])
    },
  })

  const handleClose = () => {
    dispatch(setEditProfileModal({ state: false, data: null }))
  }

  const onSubmit = async (formData: z.infer<typeof editProfileFormSchema>) => {
    try {
      setIsSubmitting(true)

      let avatarBase64 = ''
      // Check if formData.avatar is a File using type guard
      if (
        formData.avatar &&
        typeof formData.avatar !== 'string' &&
        'type' in formData.avatar
      ) {
        avatarBase64 = await fileToBase64(formData.avatar)
      }

      const submitData = {
        ...formData,
        avatar: avatarBase64 || data?.['avatar'] || null,
      }

      await updateUser(submitData)
    } catch (error) {
      toast.error(error?.['message'] || error?.['response']?.data?.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    form.reset({
      avatar: data?.['avatar'] || null,
      email: data?.['email'] || '',
      iin: data?.['iin'] || '',
      first_name: data?.['first_name'] || '',
      last_name: data?.['last_name'] || '',
      username: data?.['username'] || '',
    })
    setAvatarPreview(data?.['avatar'] || '')
  }, [data])

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={state} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="avatar"
              render={({ field: { onChange } }) => (
                <FormItem className="flex flex-col items-center">
                  <FormControl>
                    <div className="flex flex-col items-center gap-4">
                      <Avatar
                        className="h-28 w-28 cursor-pointer"
                        onClick={handleAvatarClick}
                      >
                        <AvatarImage
                          src={avatarPreview}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          {getInitials(
                            data?.['first_name'] + ' ' + data?.['last_name']
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (e) => {
                              setAvatarPreview(e.target?.result as string)
                            }
                            reader.readAsDataURL(file)
                            onChange(file)
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Click on the avatar to change your profile picture
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IIN</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your IIN" {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    Enter the IIN as on your document
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            variant="secondary"
            type="button"
            onClick={handleClose}
            disabled={isSubmitting || isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            variant="default"
            type="button"
            disabled={isSubmitting || isPending}
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              'Save changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
