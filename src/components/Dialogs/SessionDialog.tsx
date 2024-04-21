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
import { DatePicker } from '@/src/components/Input/DatePicker'
import { TextArea } from '@/src/components/Input/TextArea'
import { SliderSelect } from '@/src/components/Input/SliderSelect'
import { createSession } from '@/src/utils/createSession'
import { useSession } from 'next-auth/react'
import { ROLES } from '@/src/globalTypes'
import { updateSession } from '@/src/utils/updateSession'
import { sessionSchema } from '@/app/api/sessions/schemas'

import { SwitchField } from '../Input/SwitchField'

const sports = [
  { label: 'Tennis', value: 'Tennis' },
  { label: 'Football', value: 'Football' },
  { label: 'Basketball', value: 'Basketball' }
]

const cities = [
  { label: 'Vilnius', value: 'Vilnius' },
  { label: 'Kaunas', value: 'Kaunas' }
]

export function SessionDialog({
  update,
  session
}: {
  update: boolean
  session?: any
}) {
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState('')
  const { data } = useSession()

  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: session?.title || '',
      sport: session?.sport || '',
      city: session?.city || '',
      date: session?.date || '',
      sessionStart: session?.sessionStart || '',
      sessionFinish: session?.sessionFinish || '',
      capacity: session?.capacity || 1,
      description: session?.description || '',
      type: session?.type || false,
      approvable: session?.approvable || false,
      coachEmail: data?.user?.email || '',
      id: session?.id || ''
    }
  })

  const onSubmit = async (values: z.infer<typeof sessionSchema>) => {
    console.log({ values })
    const result = update
      ? await updateSession({ ...values })
      : await createSession({ ...values, coachEmail: data?.user?.email || '' })
    if (update) {
      console.log(result.id)
    }
    if (!result?.error) {
      setSuccessMessage('Session created/updated!')
    } else {
      setError('Failed creatin/pdating session.')
    }
  }

  const dialogTitle = update ? 'Update your session' : 'Create a Session'
  const dialogDescription = update
    ? 'You can change the details below to update your session'
    : 'Fill out the details below to create a new session'
  const buttonText = update ? 'Update session' : 'Create session'
  const sessionTitle = session ? session.title : ''
  const sessionSport = session ? session.sport : ''
  const sessionDate = session ? session.date : ''
  const sessionCity = session ? session.city : ''
  const sessionStart = session ? session.sessionStart : ''
  const sessionFinish = session ? session.sessionFinish : ''
  const sessionCapacity = session ? session.capacity : 0
  const sessionDescription = session ? session.description : ''
  const sessionRecurring = session ? session.type : false
  const sessionApprovable = session ? session.approvable : false

  return (
    <Dialog>
      <DialogTrigger asChild>
        {data?.user?.role === ROLES.COACH && (
          <Button
            variant="outline"
            className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {buttonText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[775px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <div
            className="h-[600px]"
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <form
              onSubmit={form.handleSubmit(values => {
                try {
                  console.log('Submitting form with values:', values)
                  onSubmit(values)
                } catch (error) {
                  console.error('Error submitting form:', error)
                }
              })}
              className="space-y-6 ml-2"
            >
              <TextField
                control={form.control}
                label="Session Title"
                description=""
                name="title"
                width="3/4"
                value={sessionTitle}
              />
              <SelectField
                options={sports}
                existingValue={sessionSport}
                control={form.control}
                name="sport"
                label="Sport"
                description=""
                width="[200px]"
              ></SelectField>
              <FormItem>
                <div className="flex flex-col items-start">
                  <div className="flex flex-row space-x-20">
                    <div className="flex-1">
                      <DatePicker
                        control={form.control}
                        existingValue={sessionDate}
                        name="date"
                        label="Date"
                        description=""
                      ></DatePicker>
                    </div>
                    <div className="flex-1 ">
                      <SelectField
                        options={cities}
                        existingValue={sessionCity}
                        control={form.control}
                        name="city"
                        label="City"
                        description=""
                        width="[200px]"
                      ></SelectField>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-between ">
                  <div className="flex-1">
                    <TextField
                      control={form.control}
                      value={sessionStart}
                      label="Session starts at:"
                      description=""
                      type="time"
                      name="sessionStart"
                      width="1/3"
                    />
                  </div>
                  <div className="flex-1">
                    <TextField
                      control={form.control}
                      value={sessionFinish}
                      label="Session finishes at:"
                      description=""
                      type="time"
                      name="sessionFinish"
                      width="1/3"
                    />
                  </div>
                </div>
              </FormItem>
              <SliderSelect
                control={form.control}
                existingValue={sessionCapacity}
                label="Capacity: "
                description="Select how many atendees there can be"
                name="capacity"
                min={1}
                max={100}
                step={1}
              ></SliderSelect>
              <TextArea
                control={form.control}
                value={sessionDescription}
                label="Description"
                description=""
                name="description"
                placeholder="Write a description for your session."
                rows={6}
              />
              <SwitchField
                control={form.control}
                defaultValue={sessionRecurring}
                name="type"
                title="Recurring Session"
                description="Check if this session is recurring"
              />
              <SwitchField
                control={form.control}
                defaultValue={sessionApprovable}
                name="approvable"
                title="Requires Coach Approval"
                description="Check if this session requires approval from a coach"
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
