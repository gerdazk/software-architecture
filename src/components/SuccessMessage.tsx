import { CheckIcon } from "@radix-ui/react-icons"

type Props = {
    message: string
}

export const SuccessMessage: React.FC<Props> = ({message}) => {
    return (
      <div className="flex items-center gap-3"><CheckIcon/>{message}</div>
    )
}