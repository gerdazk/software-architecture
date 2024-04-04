'use client'

import { getCoachesAwaitingConfirmation } from '@/src/utils/getCoachesAwaitingConfirmation'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { useSession } from 'next-auth/react'
import { ROLES } from '@/src/globalTypes'

import { SingleCoachConfirmation } from './components/SingleCoachConfirmation'

export default function Page() {
  const [coaches, setCoaches] = useState([])
  const { data } = useSession()

  const getCoaches = async () => {
    const allAwaitingCoaches = await getCoachesAwaitingConfirmation()
    allAwaitingCoaches && setCoaches(allAwaitingCoaches.users)
  }

  useEffect(() => {
    getCoaches()
  }, [])

  return data?.user?.role === ROLES.ADMIN ? (
    <div>
      <PageHeader
        title="Coaches awaiting confirmation"
        subtitle="All coaches with unconfirmed profiles."
      />

      <div className="flex gap-3 w-full flex-col">
        {coaches?.map(({ email, name }) => {
          return (
            <SingleCoachConfirmation name={name} email={email} key={email} />
          )
        })}
      </div>
    </div>
  ) : (
    <div></div>
  )
}
