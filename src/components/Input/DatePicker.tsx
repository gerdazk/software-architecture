import * as React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar' // Import the correct type
import { SelectSingleEventHandler } from 'react-day-picker'

type Props = {
  control: any
  name: string
  label: string
  description: string
}

export const DatePicker = ({ control, name, label, description }: Props) => {
  const [date, setDate] = React.useState<Date>()
  let footer = <p>Please pick a day.</p>
  if (date) {
    footer = <p>You picked {format(date, 'PP')}.</p>
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`w-[280px] justify-start text-left font-normal ${!date && 'text-muted-foreground'}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick date</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  initialFocus
                  mode="single"
                  selected={date}
                  onDayClick={field.onChange}
                  onSelect={setDate}
                  footer={footer}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
