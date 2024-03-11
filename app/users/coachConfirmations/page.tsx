'use client'

import { getCoachesAwaitingConfirmation } from "@/src/utils/getCoachesAwaitingConfirmation"
import { useEffect, useState } from "react"
import { SingleCoachConfirmation } from "./components/SingleCoachConfirmation"
import { PageHeader } from "@/src/components/PageHeader"

export default function Page() {

    const [coaches, setCoaches] = useState([])

    const getCoaches = async () => {
        const allAwaitingCoaches = await getCoachesAwaitingConfirmation()
        allAwaitingCoaches && setCoaches(allAwaitingCoaches.users)
    }


    useEffect(() => {
        getCoaches()
    }, [])

    

    return (
        <div>

<PageHeader title="Coaches awaiting confirmation" subtitle="All coaches with unconfirmed profiles." />

<div className="flex gap-3 w-full flex-col">
            
                {coaches?.map(({email, name}) => {
                    return  <SingleCoachConfirmation name={name} email={email} key={email} />
                })}

</div>
            
        </div>
    )
}