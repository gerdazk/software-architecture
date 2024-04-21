import * as React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Slider } from '@/components/ui/slider'

type Props = {
  control: any
  name: string
  label: string
  description: string
  min: number
  max: number
  step: number
  width?: string
  existingValue?: number // Add existingValue prop as optional
}

export const SliderSelect = ({
  control,
  name,
  label,
  description,
  min,
  max,
  step,
  width = 'full',
  existingValue
}: Props) => {
  const myValue = existingValue ? existingValue : 1
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label}
            {field.value}
          </FormLabel>
          <FormControl>
            <Slider
              min={min}
              max={max}
              step={step}
              defaultValue={[myValue]} // Set defaultValue to existingValue if provided, otherwise to min
              onValueChange={v => field.onChange(v[0])}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
