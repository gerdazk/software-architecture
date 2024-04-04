'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileDialog } from '@/src/components/Dialogs/ProfileDialog';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUser } from '@/src/utils/getUser';

export default function Profile() {
	const email = useSearchParams().get('email');
	const [user, setUser] = useState<UserData | undefined>();

	const getUserInfo = async () => {
		try {
			const userInfo = await getUser(email);
			if (userInfo) {
				const userData = userInfo;
				setUser(userData);
			} else {
				console.error('Failed to fetch user:', userInfo.error);
			}
		} catch (error) {
			console.error('Error fetching user:', error);
		}
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	console.log('user:', user);
	return (
		<>
			<ProfileDialog></ProfileDialog>

			{user ? (
				<>
					<h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>{user.name}</h1>
					<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>{user?.email}</h3>
				</>
			) : (
				<div>Loading...</div>
			)}

			<Avatar style={{ width: '100px', height: '100px' }}>
				<AvatarImage src='https://github.com/shadcn.png' style={{ width: '100%', height: '100%' }} />
				<AvatarFallback style={{ fontSize: '40px' }}>NS</AvatarFallback>
			</Avatar>

			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My description:</h2>
			{user ? (
				<h3 className='scroll-m-20 text-xl font-normal tracking-tight'>{user.description}</h3>
			) : (
				<div>Loading...</div>
			)}

			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My city:</h2>
			{user ? <h3 className='scroll-m-20 text-xl font-normal tracking-tight'>{user.city}</h3> : <div>Loading...</div>}

			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My rating:</h2>
			{user ? (
				<h3 className='scroll-m-20 text-xl font-normal tracking-tight'>TO BE IMPLEMENTED</h3>
			) : (
				<div>Loading...</div>
			)}

			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My sessions:</h2>
			{user ? (
				<h3 className='scroll-m-20 text-xl font-normal tracking-tight'>TO BE IMPLEMENTED</h3>
			) : (
				<div>Loading...</div>
			)}

			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>My sports:</h2>
			{user && user.role === 'coach' ? (
				<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>(HARDCODED) Tennis, Football</h3>
			) : (
				<div>Loading...</div>
			)}

			<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>Pending session join requests:</h2>
			{user && user.role === 'coach' ? (
				<h3 className='scroll-m-20 text-2xl font-normal tracking-tight'>TO BE IMPLEMENTED</h3>
			) : (
				<div>Loading...</div>
			)}
		</>
	);
}
