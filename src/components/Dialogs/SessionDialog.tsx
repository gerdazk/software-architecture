'use client';

import React, { useState } from 'react';
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
import { Form, FormItem } from '@/components/ui/form';
import { TextField } from '@/src/components/Input/TextField';
import { Button } from '@/components/ui/button';
import { SwitchField } from '../Input/SwitchField';
import { SelectField } from '@/src/components/Input/Select';
import { DatePicker } from '@/src/components/Input/DatePicker';
import { TextArea } from '@/src/components/Input/TextArea';
import { SliderSelect } from '@/src/components/Input/SliderSelect';
import { createSession } from '@/src/utils/createSession';

const sports = [
	{ label: 'Tennis', value: 'Tennis' },
	{ label: 'Football', value: 'Football' },
	{ label: 'Basketball', value: 'Basketball' },
];

const cities = [
	{ label: 'Vilnius', value: 'Vilnius' },
	{ label: 'Kaunas', value: 'Kaunas' },
];

const formSchema = z.object({
	title: z.string(),
	sport: z.string(),
	city: z.string(),
	date: z.date(),
	sessionStart: z.string(),
	sessionFinish: z.string(),
	capacity: z.number(),
	description: z.string(),
	type: z.boolean(),
	approvable: z.boolean(),
});

export function SessionDialog() {
	const [successMessage, setSuccessMessage] = useState('');

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log('Form submitted');
		console.log({ values });

		const result = await createSession({
			...values,
		});

		if (!result?.error) {
			setSuccessMessage('Session created!');
			console.log('Successfully created session:', result);
		} else {
			console.error('Failed from SessionDialog:', result?.error);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
				>
					Create session
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[775px]'>
				<DialogHeader>
					<DialogTitle>Create a Session</DialogTitle>
					<DialogDescription>Fill out the details below to create a new session</DialogDescription>
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
							<TextField control={form.control} label='Session Title' description='' name='title' width='3/4' />
							<SelectField
								options={sports}
								control={form.control}
								name='sport'
								label='Sport'
								placeholder='Select sport'
								description=''
								width='[200px]'
							></SelectField>
							<FormItem>
								<div className='flex flex-col items-start'>
									<div className='flex flex-row space-x-20'>
										<div className='flex-1'>
											<DatePicker control={form.control} name='date' label='Date' description=''></DatePicker>
										</div>
										<div className='flex-1 '>
											<SelectField
												options={cities}
												control={form.control}
												name='city'
												label='City'
												placeholder='Select city'
												description=''
												width='[200px]'
											></SelectField>
										</div>
									</div>
								</div>
								<div className='flex flex-row justify-between '>
									<div className='flex-1'>
										<TextField
											control={form.control}
											label='Session starts at:'
											description=''
											type='time'
											name='sessionStart'
											width='1/3'
										/>
									</div>
									<div className='flex-1'>
										<TextField
											control={form.control}
											label='Session finishes at:'
											description=''
											type='time'
											name='sessionFinish'
											width='1/3'
										/>
									</div>
								</div>
							</FormItem>
							<SliderSelect
								control={form.control}
								label='Capacity: '
								description='Select how many atendees there can be'
								name='capacity'
								min={1}
								max={100}
								step={1}
							></SliderSelect>
							<TextArea
								control={form.control}
								label='Description'
								description=''
								name='description'
								placeholder='Write a description for your session.'
								rows={6}
							/>
							<SwitchField
								control={form.control}
								name='type'
								title='Recurring Session'
								description='Check if this session is recurring'
							/>
							<SwitchField
								control={form.control}
								name='approvable'
								title='Requires Coach Approval'
								description='Check if this session requires approval from a coach'
							/>
							<DialogFooter>
								{successMessage ? <div>{successMessage}</div> : <Button type='submit'>Submit</Button>}
							</DialogFooter>
						</form>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
