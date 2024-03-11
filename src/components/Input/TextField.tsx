import * as React from "react"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

type Props = {
    placeholder?: string
    control: any
    name: string 
    label: string
    description: string
    type?: string
    min?: string
}

export const TextField = ({placeholder, control, name, label, description, type, min}: Props) => {
    return (
        <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input placeholder={placeholder} {...field} type={type} min={min} />
            </FormControl>
            <FormDescription>
              {description}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    )
}