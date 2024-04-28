import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { User, UserSession } from '@prisma/client'

import { RateUserDialog } from './RateUserDialog'

type UsersDialogProps = {
  users: (User & {
    UserSession: UserSession[]
  })[]
  hasSessionEnded: boolean
}

export const UsersDialog: React.FC<UsersDialogProps> = ({
  users,
  hasSessionEnded,
  onSessionChange
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          <Button
            variant="outline"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {hasSessionEnded ? 'Rate users' : 'View registered users'}
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[775px]">
        <DialogHeader>
          <DialogTitle>List of users</DialogTitle>
        </DialogHeader>
        <div>
          {users?.length ? (
            <div className="flex flex-col gap-3">
              {users.map(
                ({ user: { name, email }, sessionId, userId, isUserRated }) => (
                  <Card
                    key={name}
                    className="flex items-center justify-between"
                  >
                    <CardHeader>
                      <CardTitle>{name}</CardTitle>
                      <CardDescription>{email}</CardDescription>
                    </CardHeader>
                    {hasSessionEnded && !isUserRated && (
                      <RateUserDialog
                        userId={userId}
                        sessionId={sessionId}
                        onSessionChange={onSessionChange}
                      />
                    )}
                  </Card>
                )
              )}
            </div>
          ) : (
            <div>No users to display.</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
