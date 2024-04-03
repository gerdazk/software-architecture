import * as React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type Option = {
	label: string;
	value: string;
};

type Props = {
	options: Option[];
	control: any;
	name: string;
	label: string;
	description: string;
};

export const MultipleSelectField = ({ options, control, name, label, description }: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{options.map((option) => (
							<div key={option.value}>
								<input
									type='checkbox'
									id={option.value}
									name={name}
									value={option.value}
									checked={field.value && field.value.includes(option.value)}
									onChange={(e) => {
										const isChecked = e.target.checked;
										const value = e.target.value;
										const updatedValues = isChecked
											? [...(field.value || []), value] // Add value to array
											: (field.value || []).filter((val: string) => val !== value); // Remove value from array
										field.onChange(updatedValues);
									}}
								/>
								<label htmlFor={option.value}>{option.label}</label>
							</div>
						))}
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
