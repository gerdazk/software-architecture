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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Option = {
  label: string
  value: string
}

type Props = {
  options: Option[]
  existingValue: string
  control: any
  name: string
  label: string
  description: string
  width?: string
}

export const SelectField = ({
  options,
  existingValue,
  control,
  name,
  label,
  description,
  width = 'full'
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={
                options.find(option => option.value === existingValue)?.value ||
                ''
              }
            >
              <SelectTrigger className={`w-${width}`}>
                <SelectValue placeholder={existingValue} />
              </SelectTrigger>
              <SelectContent>
                {options.map(option => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    onClick={() => field.onChange(option.value)}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
