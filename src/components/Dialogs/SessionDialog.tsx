'use client';

import React, { FormEventHandler } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextField } from '@/src/components/Input/TextField';
import { Button } from '@/components/ui/button';
import { SwitchField } from '../Input/SwitchField';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { createSession } from '@/src/utils/createSession';

const formSchema = z.object({
	title: z.string(),
	sport: z.string(),
	city: z.string(),
	date: z.date(),
	sessionStart: z.string(),
	sessionFinish: z.string(),
	capacity: z
		.number()
		.min(1, {
			message: 'Capacity must be at least 1.',
		})
		.max(100, {
			message: 'Capacity must be at most 100.',
		})
		.default(5),
	description: z.string(),
	type: z.boolean(),
	approvable: z.boolean(),
});

export function SessionDialog() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: 'title',
			sport: 'sport',
			city: 'Some City',
			date: new Date(),
			sessionStart: 'some start',
			sessionFinish: 'some finish',
			capacity: 5,
			description: 'Session description',
			type: true,
			approvable: true,
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		console.log({ values });
		const result = await createSession({
			...values,
		});

		if (!result?.error) {
			//setSuccessMessage('Sign up successful. You can now log in.');
			console.log('Successfully created session:', result);
		} else {
			console.error('Failed from SessionDialog:', result?.error);
		}
	};

	const [date, setDate] = React.useState<Date>();

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
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 ml-2'>
							<TextField control={form.control} label='Session Title' description='' name='title' width='3/4' />
							<FormItem>
								<FormLabel>Sport</FormLabel>
								<Select>
									<SelectTrigger className='w-[200px]'>
										<SelectValue placeholder='' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='tennis'>Tennis</SelectItem>
										<SelectItem value='football'>Football</SelectItem>
										<SelectItem value='baskteball'>Baskteball</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
							<FormItem>
								<div className='flex flex-col items-start'>
									<div className='flex flex-row space-x-20'>
										<div className='flex-1'>
											<FormLabel className='mb-2'>Date </FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<Button
														variant={'outline'}
														className={`w-[280px] justify-start text-left font-normal ${
															!date && 'text-muted-foreground'
														}`}
													>
														<CalendarIcon className='mr-2 h-4 w-4' />
														{date ? format(date, 'PPP') : <span>Pick a date</span>}
													</Button>
												</PopoverTrigger>
												<PopoverContent className='w-auto p-0'>
													<Calendar mode='single' selected={date} onSelect={setDate} initialFocus />
												</PopoverContent>
											</Popover>
										</div>
										<div className='flex-1 '>
											<FormLabel>City</FormLabel>
											<Select>
												<SelectTrigger className='w-[200px]'>
													<SelectValue placeholder='' />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value='vilnius'>Vilnius</SelectItem>
													<SelectItem value='kaunas'>Kaunas</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</div>
								</div>
								<div className='flex flex-row justify-between '>
									<div className='flex-1'>
										<TextField
											control={form.control}
											label='Session starts at:'
											description=''
											name='timeStart'
											type='time'
											width='1/3'
										/>
									</div>
									<div className='flex-1'>
										<TextField
											control={form.control}
											label='Session finishes at:'
											description=''
											name='timeFinish'
											type='time'
											width='1/3'
										/>
									</div>
								</div>
							</FormItem>
							<FormField
								control={form.control}
								name='capacity'
								render={({ field: { value, onChange } }) => (
									<FormItem>
										<FormLabel>Capacity - {value}</FormLabel>
										<FormControl>
											<Slider min={0} max={100} step={1} defaultValue={[value]} onValueChange={onChange} />
										</FormControl>
										<FormDescription>Select how many atendees there can be.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormItem>
								<FormLabel>Description</FormLabel>
								<Textarea placeholder='Write a description for your session.' rows={6} />
							</FormItem>
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
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
