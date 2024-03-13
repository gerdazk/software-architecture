'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';

import { Form } from '@/components/ui/form';
import { TextField } from '@/src/components/Input/TextField';
import { Button } from '@/components/ui/button';
import { SwitchField } from '../Input/SwitchField';

// Define your form schema
const formSchema = z.object({
	sessionTitle: z.string().nonempty('Session title is required'),
	sport: z.string().nonempty('Sport is required'),
});

export function SessionDialog() {
	// Initialize form hook
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			sessionTitle: '',
			sport: '',
		},
	});

	// Form submit handler
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values);
		// Handle form submission
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='outline'>Create session</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Create a Session</DialogTitle>
					<DialogDescription>Fill out the details below to create a new session</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<TextField control={form.control} label='Session Title' description='' name='sessionTitle' />
						<TextField control={form.control} label='Sport' description='' name='sport' />
						<SwitchField
							control={form.control}
							name='recurringSession'
							title='Recurring Session'
							description='Check if this session is recurring'
						/>
						<SwitchField
							control={form.control}
							name='requiresCoachApproval'
							title='Requires Coach Approval'
							description='Check if this session requires approval from a coach'
						/>
						<DialogFooter>
							<Button type='submit'>Submit</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
