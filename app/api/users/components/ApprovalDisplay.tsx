import { Button } from '@/components/ui/button'
import { SuccessMessage } from '@/src/components/SuccessMessage'
import { PersonIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

export function ApprovalDisplay({ userSession, email }) {
  const [isActivated, setActivated] = useState(false)

  const approveUser = async () => {
    try {
      const response = await fetch(`/api/userSessions/?email=${email}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId: userSession.sessionId,
          userId: userSession.userId
        })
      })

      if (response.ok) {
        setActivated(true)
      } else {
        const error = await response.json()
        console.error('Error approving user:', error)
      }
    } catch (error) {
      console.error('Error approving user:', error)
    }
  }
  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <PersonIcon />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {userSession.user.name} wants to join {userSession.session.title} (
          {userSession.session.date.substring(0, 10)})
        </p>
      </div>
      {isActivated ? (
        <SuccessMessage message="User approved" />
      ) : (
        <Button
          variant="outline"
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => approveUser()}
        >
          Approve
        </Button>
      )}
    </div>
  )
}
