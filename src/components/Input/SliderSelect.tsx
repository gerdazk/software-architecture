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
}

export const SliderSelect = ({
  control,
  name,
  label,
  description,
  min,
  max,
  step,
  width = 'full'
}: Props) => {
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
              defaultValue={field.value}
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
