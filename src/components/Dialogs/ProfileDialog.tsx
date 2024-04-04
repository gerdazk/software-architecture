'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Form, FormItem } from '@/components/ui/form'
import { TextField } from '@/src/components/Input/TextField'
import { Button } from '@/components/ui/button'
import { SelectField } from '@/src/components/Input/Select'
import { TextArea } from '@/src/components/Input/TextArea'
import { useSession } from 'next-auth/react'
import { ROLES } from '@/src/globalTypes'
import { updateUser } from '@/src/utils/updateUser'
import { MultipleSelectField } from '@/src/components/Input/MultipleSelect'

const sports = [
  { label: 'Tennis', value: 'Tennis' },
  { label: 'Football', value: 'Football' },
  { label: 'Basketball', value: 'Basketball' }
]

const cities = [
  { label: 'Vilnius', value: 'Vilnius' },
  { label: 'Kaunas', value: 'Kaunas' }
]

const formSchema = z.object({
	email: z.string(),
	name: z.string(),
	city: z.string(),
	description: z.string(),
});

interface ProfileDialogProps {
	user: UserData;
}

export function ProfileDialog({ user }: ProfileDialogProps) {
	const [successMessage, setSuccessMessage] = useState('');
	const [error, setError] = useState('');
	const { data } = useSession();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: user.email,
			name: user.name,
			city: user.city,
			description: user.description,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log('Form submitted with values:', values);
		const result = await updateUser({
			...values,
		});
		console.log('Update user result:', result);

    if (!result?.error) {
      setSuccessMessage('User updated!')
    } else {
      setError('Failed updating user.')
    }
  }

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
				>
					Edit
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[775px]'>
				<DialogHeader>
					<DialogTitle>Update information</DialogTitle>
					<DialogDescription>Fill out the fields below to update your information.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<div
						className='h-[600px]'
						style={{ overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
					>
						<form
							onSubmit={form.handleSubmit((values) => {
								try {
									console.log('Submitting form with values:', values);
									onSubmit(values);
								} catch (error) {
									console.error('Error submitting form:', error);
								}
							})}
							className='space-y-6 ml-2'
						>
							<TextField
								control={form.control}
								label='Name'
								placeholder='some name'
								description=''
								name='name'
								width='2/3'
							/>
							{user.role === 'coach' && <p>only coach sees this</p>}


              {/* <MultipleSelectField
    options={sports}
    control={form.control}
    name='sport'
    label='Sport'
    description=''
  /> */}

							<SelectField
								options={cities}
								control={form.control}
								name='city'
								label='City'
								placeholder={user.city}
								description=''
								width='[200px]'
							></SelectField>

              <TextArea
                control={form.control}
                label="Description"
                description=""
                name="description"
                placeholder="Write a description for your session."
                rows={6}
              />

              <DialogFooter>
                {!!error && (
                  <div className="text-destructive text-sm">{error}</div>
                )}
                {successMessage ? (
                  <div>{successMessage}</div>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </DialogFooter>
            </form>
          </div>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
