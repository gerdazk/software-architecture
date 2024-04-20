import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type Props = {
  title: string
  subtitle?: string
  buttonText?: string
  buttonVariant?: string
  onButtonClick?: () => void
  disabled?: boolean
}

export const PageHeader: React.FC<Props> = ({
  title,
  subtitle,
  buttonText,
  buttonVariant,
  onButtonClick,
  disabled
}) => {
  return (
    <div className="hidden space-y-6 pb-16 pt-8 md:block">
      <div className="flex flex-row justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        {buttonText && (
          <Button
            variant={buttonVariant}
            onClick={onButtonClick}
            disabled={disabled}
          >
            {buttonText}
          </Button>
        )}
      </div>
      <Separator className="my-6" />
    </div>
  )
}
