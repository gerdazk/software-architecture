import { getSingleSession } from '@/src/utils/getSingleSession'
import dayjs from 'dayjs'

export const isRegistrationOpen = async ({
  sessionId
}: {
  sessionId: string
}) => {
  const session = await getSingleSession(sessionId)

  const isFinished = dayjs(Date.now()).isAfter(dayjs(session.date))
  const isFull = session.capacity <= session.UserSession?.length

  return !isFull && !isFinished
}
