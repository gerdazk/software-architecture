import React from 'react';
import { PersonIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

type Props = {
	name: string;
	email: string;
};

export const SingleCoachDisplay: React.FC<Props> = ({ name, email }) => {
	return (
		<div className='px-4 sm:px-6 lg:px-8'>
			<h1 className='mb-4 text-xl font-medium leading-tight tracking-normal text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>
				{name}
			</h1>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-gray-900 dark:text-white'>Description:</h2>
				<p className='text-sm text-gray-700 dark:text-gray-400'>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce volutpat purus eget orci euismod lacinia.
				</p>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-gray-900 dark:text-white'>Sports:</h2>
				<ul className='text-sm text-gray-700 dark:text-gray-400'>
					<li>Football</li>
					<li>Basketball</li>
					<li>Tennis</li>
				</ul>
			</div>
			<div className='mb-4'>
				<h2 className='text-lg font-medium text-gray-900 dark:text-white'>Email:</h2>
				<p className='text-sm text-gray-700 dark:text-gray-400'>{email}</p>
			</div>
		</div>
	);
};
