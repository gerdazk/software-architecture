import { z } from 'zod'

export const userUpdateSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  city: z.string(),
  sports: z.string(),
  description: z.string()
})
