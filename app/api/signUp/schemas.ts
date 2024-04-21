import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  password: z.string().min(1),
  requestedToBeCoach: z.boolean().default(false)
})
