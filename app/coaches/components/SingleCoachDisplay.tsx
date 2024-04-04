import React from 'react'
import { PersonIcon } from '@radix-ui/react-icons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

type Props = {
  name: string
  email: string
}

export const SingleCoachDisplay: React.FC<Props> = ({ name, email }) => {
  return (
    <Card className="px-4 sm:px-6 lg:px-8 py-3">
      <CardHeader className="flex flex-row items-center gap-3">
        <PersonIcon className="w-6 h-6" />
        <div>
          <CardTitle>{name}</CardTitle>
          <CardDescription>Coach</CardDescription>
        </div>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Description:</p>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              volutpat purus eget orci euismod lacinia.
            </p>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Sports:</p>
            <ul className="text-sm text-gray-700 dark:text-gray-400">
              <li>Football</li>
              <li>Basketball</li>
              <li>Tennis</li>
            </ul>
          </div>
        </div>
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
          <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Email:</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
