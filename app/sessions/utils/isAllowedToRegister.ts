import { ROLES } from '@/src/globalTypes'
import { getSingleSession } from '@/src/utils/getSingleSession'
import dayjs from 'dayjs'

export const isAllowedToRegister = async ({ user, sessionId }) => {
  if (!sessionId || !user || user.role !== ROLES.USER) {
    return false
  }

  const session = await getSingleSession(sessionId)

  const isFinished = dayjs(Date.now()).isAfter(dayjs(session.date))
  const isFull = session.capacity <= session.UserSession?.length
  const isAlreadyRegistered = session.UserSession.find(
    ({ userId }: { userId: string }) => userId === user.id
  )

  return !isFinished && !isFull && !isAlreadyRegistered
}
