import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

import { rateUser } from '../utils/rateUser'

type RateUserDialogProps = {
  userId: number
  sessionId: string
  onSessionChange: () => void
}

export const RateUserDialog: React.FC<RateUserDialogProps> = ({
  userId,
  sessionId,
  onSessionChange
}) => {
  const [rating, setRating] = useState('1')
  const [isOpen, setOpen] = useState(false)

  const handleSubmit = async () => {
    await rateUser({
      userId,
      sessionId,
      rating
    })
    setOpen(false)
    onSessionChange()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {
          <Button
            variant="outline"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Rate user
          </Button>
        }
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Rate this user 1-5</DialogTitle>
        </DialogHeader>
        <Input
          value={rating}
          onChange={e => setRating(e.target.value)}
          min="1"
          max="5"
          type="number"
        />
        <Button onClick={handleSubmit} type="submit">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  )
}
