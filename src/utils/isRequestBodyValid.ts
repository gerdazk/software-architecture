import { ZodSchema } from 'zod'

type IsRequestBodyValidProps = {
  schema: ZodSchema
  body: unknown
}

export const isRequestBodyValid = ({
  schema,
  body
}: IsRequestBodyValidProps) => {
  try {
    schema.parse(body)
    return true
  } catch (e: unknown) {
    console.log({ e })
    return false
  }
}
