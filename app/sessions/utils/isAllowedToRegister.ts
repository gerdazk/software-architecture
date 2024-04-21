import { ROLES } from '@/src/globalTypes'

export const isAllowedToRegister = async ({ user, sessionId }) => {
  if (!sessionId || !user || user.role !== ROLES.USER) {
    return false
  }

  return true
}
