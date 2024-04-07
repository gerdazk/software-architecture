'use client'

import { getAllCoaches } from '@/src/utils/getAllCoaches'
import { useEffect, useState } from 'react'
import { PageHeader } from '@/src/components/PageHeader'
import { SingleCoachDisplay } from '@/app/coaches/components/SingleCoachDisplay'

import { CoachesTable } from './components/CoachesTable'

export default function Page() {
  const [coaches, setCoaches] = useState([])

  const getCoaches = async () => {
    const allCoaches = await getAllCoaches()
    allCoaches && setCoaches(allCoaches.users)
  }

  useEffect(() => {
    getCoaches()
  }, [])

  return (
    <>
      <div className="flex flex-col">
        <PageHeader title="All coaches" />
        <div className="gap-6 flex flex-col">
          <CoachesTable data={coaches} />
        </div>
      </div>
    </>
  )
}
