import * as React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type Props = {
	placeholder?: string;
	value: string;
	control: any;
	name: string;
	label: string;
	description: string;
	type?: string;
	min?: string;
	width?: string;
};

export const TextField = ({
	placeholder,
	value,
	control,
	name,
	label,
	description,
	type,
	min,
	width = 'full',
}: Props) => {
	return (
		<FormField
			control={control}
			name={name}
			defaultValue={value}
			render={({ field }) => (
				<FormItem>
					<FormLabel>{label}</FormLabel>
					<FormControl>
						<Input placeholder={placeholder} {...field} type={type} min={min} className={`w-${width}`} />
					</FormControl>
					<FormDescription>{description}</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
