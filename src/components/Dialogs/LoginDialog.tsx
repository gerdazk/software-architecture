'use client';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { TextField } from '@/src/components/Input/TextField';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
	.object({
		email: z.string().max(20),
		password: z.string(),
	})
	.required();

export const LoginDialog = () => {
	const [isDialogOpen, setDialogOpen] = useState(false);
	const [error, setError] = useState('');
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	const onSubmit = async (values: any) => {
		const result = await signIn('credentials', {
			redirect: false,
			...values,
		});

		if (!result?.error) {
			setDialogOpen(false);
		} else {
			setError('Login failed. Please check your login details.');
			console.error('Login failed:', result?.error);
		}
	};
	return (
		<Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button variant='outline'>Log in</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Log in</DialogTitle>
					<DialogDescription>Log in to the application. If you do not have an account, create one.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<TextField control={form.control} label='Username' description='' placeholder='' name='email' />
						<TextField
							control={form.control}
							label='Password'
							description=''
							placeholder=''
							name='password'
							type='password'
						/>
						<DialogFooter>
							{!!error && <div className='text-destructive text-sm'>{error}</div>}
							<Button type='submit'>Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
