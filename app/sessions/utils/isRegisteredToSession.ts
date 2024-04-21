import { getSingleSession } from '@/src/utils/getSingleSession'

export const isRegisteredToSession = async ({ sessionId, user }) => {
  const session = await getSingleSession(sessionId)

  const isAlreadyRegistered = session.UserSession.find(
    ({ userId }: { userId: string }) => userId === user.id
  )

  return isAlreadyRegistered
}
