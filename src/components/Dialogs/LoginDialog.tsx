'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form
} from "@/components/ui/form"
import { TextField } from "@/src/components/Input/TextField"
import { signIn } from "next-auth/react"

const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters."
    })
  })

export const  LoginDialog = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        // resolver: zodResolver(formSchema),
        defaultValues: {
          // username: ""
        }
      })
     
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const result = await signIn('credentials', {
          redirect: false,
          ...values
        });

        if (!result?.error) {
          console.log('Successfully logged in:', result);
        } else {
          console.error('Login failed:', result?.error);
        }
      }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Log in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log in</DialogTitle>
          <DialogDescription>
            Log in to the application. If you do not have an account, create one.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextField control={form.control} label="Username" description="" placeholder="" name="email" />
        <TextField control={form.control} label="Password" description="" placeholder="" name="password" type="password" />
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
        </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}