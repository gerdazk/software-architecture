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
import { registerUser } from "@/src/utils/registerNewUser"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    email: z.string(),
    name: z.string().min(5),
    password: z.string().min(8)
  }).required()

export const  RegistrationDialog = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          // username: ""
        }
      })
     
      const onSubmit = async (values: z.infer<typeof formSchema>) => {
            const result = await registerUser({...values})

            if (!result?.error) {
                console.log('Successfully logged in:', result);
              } else {
                console.error('Login failed:', result?.error);
              }
      }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create an account</DialogTitle>
          <DialogDescription>
            Create an account for login
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <TextField control={form.control} label="Email" description="" placeholder="" name="email" type="email" />
        <TextField control={form.control} label="Password" description="" placeholder="" name="password" type="password" />
        <TextField control={form.control} label="Name" description="" placeholder="" name="name" />
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
        </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}