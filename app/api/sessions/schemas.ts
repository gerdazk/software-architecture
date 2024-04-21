import { z } from 'zod'

export const sessionSchema = z
  .object({
    title: z.string(),
    sport: z.string(),
    city: z.string(),
    date: z.string(),
    sessionStart: z.string(),
    sessionFinish: z.string(),
    capacity: z.number(),
    description: z.string(),
    type: z.boolean().default(false),
    approvable: z.boolean().default(false),
    coachEmail: z.string(),
    id: z.string().optional().default('')
  })
  .refine(
    data => {
      const startTime = parseTime(data.sessionStart)
      const finishTime = parseTime(data.sessionFinish)
      return startTime < finishTime
    },
    {
      message: 'Session finish time must be later than session start time',
      path: ['sessionFinish']
    }
  )

export const sessionEditSchema = z
  .object({
    title: z.string(),
    sport: z.string(),
    city: z.string(),
    date: z.string(),
    sessionStart: z.string(),
    sessionFinish: z.string(),
    capacity: z.number(),
    description: z.string(),
    type: z.boolean().default(false),
    approvable: z.boolean().default(false),
    coachEmail: z.string(),
    id: z.string()
  })
  .refine(
    data => {
      const startTime = parseTime(data.sessionStart)
      const finishTime = parseTime(data.sessionFinish)
      return startTime < finishTime
    },
    {
      message: 'Session finish time must be later than session start time',
      path: ['sessionFinish']
    }
  )

function parseTime(timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number)
  return new Date(2000, 0, 1, hours, minutes)
  // It will compare only hours and minutes of the selected time for the same
  // dummy date.
}

export const sessionRegisterSchema = z.object({
  sessionId: z.string().min(1),
  userId: z.string().min(1),
  isConfirmed: z.boolean().default(true)
})
