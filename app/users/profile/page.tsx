'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileDialog } from '@/src/components/Dialogs/ProfileDialog';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUser } from '@/src/utils/getUser';

export default function Profile() {
	const email = useSearchParams().get('email');
	const [user, setUser] = useState([]);

	const getUserInfo = async () => {
		const userInfo = await getUser();
		userInfo && setUser(userInfo.users);
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<>
			<ProfileDialog></ProfileDialog>

			{user ? (
				<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>name</h1>
			) : (
				<div>Loading...{email}</div>
			)}
			<Avatar style={{ width: '100px', height: '100px' }}>
				<AvatarImage src='https://github.com/shadcn.png' style={{ width: '100%', height: '100%' }} />
				<AvatarFallback style={{ fontSize: '40px' }}>NS</AvatarFallback>
			</Avatar>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My email:</h2>
			<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>email</h3>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>[IF COACH] My sports:</h2>
			<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>Tennis, Football</h3>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>[IF COACH] My description:</h2>
			<p className='scroll-m-20 text-xl font-normal tracking-tight'>
				A coach is an individual who possesses expertise, experience, and a set of specialized skills in guiding,
				training, and mentoring others to achieve specific goals or improve performance in various areas of life.
				Coaches can work in a wide range of fields, including sports, business, personal development, education, and
				more. They play a crucial role in helping individuals and teams reach their full potential by providing
				guidance, support, and accountability.
			</p>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My city:</h2>
			<h3 className='scroll-m-20 text-xl font-normal tracking-tight'>Vilnius</h3>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>[IF COACH] Pending session join requests:</h2>
			<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>TO BE IMPLEMENTED</h3>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My rating:</h2>
			<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>TO BE IMPLEMENTED</h3>
			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My sessions:</h2>
			<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>TO BE IMPLEMENTED</h3>
		</>
	);
}
