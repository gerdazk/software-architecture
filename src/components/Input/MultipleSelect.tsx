import * as React from 'react'
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

type Option = {
  label: string
  value: string
}

type Props = {
  options: Option[]
  control: any
  name: string
  label: string
  description: string
}

export const MultipleSelectField = ({
  options,
  control,
  name,
  label,
  description
}: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <select
            multiple
            id={name}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...field}
            onChange={e => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                option => option.value
              )
              field.onChange(selectedOptions)
            }}
            value={field.value || []}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
