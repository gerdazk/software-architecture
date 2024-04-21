'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ProfileDialog } from '@/src/components/Dialogs/ProfileDialog'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getUser } from '@/src/utils/getUser'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { PageHeader } from '@/src/components/PageHeader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { getCoachSessions } from '@/src/utils/getCoachSessions'
import { SessionTable } from '@/app/sessions/components/SessionTable'
import { SessionDisplay } from '@/app/api/users/components/SessionDisplay'

export default function Profile() {
  const email = useSearchParams().get('email')
  const [user, setUser] = useState<UserData | undefined>()
  const [sessions, setSessions] = useState([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const router = useRouter()
  const { data } = useSession()

  const rating = 0

  const getUserInfo = async () => {
    try {
      const userInfo = await getUser(email)
      if (userInfo) {
        const userData = userInfo
        setUser(userData)
      } else {
        console.error('Failed to fetch user:', userInfo.error)
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }

  const updateUserState = () => {
    getUserInfo()
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const getSessions = async () => {
    const allSessions = await getCoachSessions(email)
    console.log('Email is:', email)
    console.log('All sessions:', allSessions)
    allSessions && setSessions(allSessions.sessions)
  }

  useEffect(() => {
    getSessions()
  }, [])

  return (
    <>
      {/* {user && (
        <ProfileDialog
          user={user}
          onUpdateUser={updateUserState}
          onClose={handleDialogClose}
        />
      )} */}

      <PageHeader title="User profile" subtitle="View profile details" />

      {user ? (
        <div className="">
          <div className="flex w-full gap-6">
            <Card className="w-full">
              <CardHeader className="flex gap-4 flex-row items-center justify-between">
                <div className="flex gap-4 flex-row items-center">
                  <Avatar>
                    <AvatarFallback>
                      {user.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>

                {data?.user?.email === user.email && (
                  <ProfileDialog
                    user={user}
                    onUpdateUser={updateUserState}
                    onClose={handleDialogClose}
                  />
                )}
              </CardHeader>
              <div className="px-8">
                <CardTitle>Description</CardTitle>
                <CardDescription>{user.description}</CardDescription>
              </div>
              <CardContent className="grid gap-4"></CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader className="flex gap-4">
                <div>
                  <CardTitle>Role</CardTitle>
                  <CardDescription>{user.role}</CardDescription>
                </div>
                {user.sports && (
                  <div>
                    <CardTitle>Sports</CardTitle>
                    <Badge>{user.sports}</Badge>
                  </div>
                )}
                <div>
                  <CardTitle>Location</CardTitle>
                  <CardDescription>{user.city}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
          <PageHeader
            title="My sessions"
            subtitle={
              user.role === 'user'
                ? 'View all reservations'
                : 'View my sessions'
            }
          />
          {sessions && sessions.length > 0 ? (
            sessions.map((session, index) => (
              <SessionDisplay key={index} session={session} />
            ))
          ) : (
            <div className="mb-2">You haven't created any sessions.</div>
          )}
          {user.role === 'coach' ? (
            <Button variant="outline" onClick={() => router.push('/sessions')}>
              Go to sessions main page and create a session
            </Button>
          ) : (
            <Button variant="outline" onClick={() => router.push('/sessions')}>
              Go to sessions main page and join a session
            </Button>
          )}
        </div>
      ) : (
        <div
          className="flex items-center justify-center"
          style={{ marginTop: '13vh' }}
        >
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </>
  )
}
