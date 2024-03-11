import { Button } from "@/components/ui/button"
import { SuccessMessage } from "@/src/components/SuccessMessage"
import { PersonIcon } from "@radix-ui/react-icons"
import { useState } from "react"

type Props = {
    name: string
    email: string
}

export const SingleCoachConfirmation: React.FC<Props> = ({name, email}) => {
    const [isActivated, setActivated] = useState(false)

    const activateCoachProfile = async () => {

        try {
            const response = await fetch('/api/users/coachConfirmations', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email }),
            });
        
            if (response.ok) {
                setActivated(true)
            } else {
              const error = await response.json();
              console.error('Error updating user role:', error);
            }
          } catch (error) {
            console.error('Error updating user role:', error);
          }

    }
    return (
        <div className=" flex items-center space-x-4 rounded-md border p-4">
        <PersonIcon />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            {name}
          </p>
          <p className="text-sm text-muted-foreground">
            {email}
          </p>
        </div>
        {isActivated ? <SuccessMessage message="Coach activation successful" /> :  <Button onClick={() => activateCoachProfile()}>Activate coach profile</Button>}
      </div>
    )
}