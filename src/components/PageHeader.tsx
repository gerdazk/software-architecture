import { Separator } from "@/components/ui/separator"

type Props = {
  title: string
  subtitle: string
}

export const PageHeader: React.FC<Props> = ({title, subtitle}) => {
    return (
        <div className="hidden space-y-6 pb-16 pt-8 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">
            {subtitle}
          </p>
        </div>
        <Separator className="my-6" />
      </div>
    )
}