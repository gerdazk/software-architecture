'use client';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ProfileDialog } from '@/src/components/Dialogs/ProfileDialog';

export default function Profile() {
	return (
		<>
			<ProfileDialog></ProfileDialog>

			<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>John Doe</h1>
			<Avatar style={{ width: '100px', height: '100px' }}>
				<AvatarImage src='https://github.com/shadcn.png' style={{ width: '100%', height: '100%' }} />
				<AvatarFallback style={{ fontSize: '40px' }}>NS</AvatarFallback>
			</Avatar>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My email:</h2>
			<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>john@example.com</h3>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My sports:</h2>
			<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>Tennis, Football</h3>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My description:</h2>
			<p className='scroll-m-20 text-xl font-normal tracking-tight'>
				A coach is an individual who possesses expertise, experience, and a set of specialized skills in guiding,
				training, and mentoring others to achieve specific goals or improve performance in various areas of life.
				Coaches can work in a wide range of fields, including sports, business, personal development, education, and
				more. They play a crucial role in helping individuals and teams reach their full potential by providing
				guidance, support, and accountability.
			</p>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My city:</h2>
			<h3 className='scroll-m-20 text-xl font-normal tracking-tight'>Vilnius</h3>
		</>
	);
}
