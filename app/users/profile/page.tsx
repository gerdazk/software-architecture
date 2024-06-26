'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileDialog } from '@/src/components/Dialogs/ProfileDialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUser } from '@/src/utils/getUser';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/src/components/PageHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { getCoachSessions } from '@/src/utils/getCoachSessions';
import { SessionDisplay } from '@/app/api/users/components/SessionDisplay';
import { ApprovalDisplay } from '@/app/api/users/components/ApprovalDisplay';
import { getWaitingApprovals } from '@/src/utils/getWaitingApprovals';
import { UserBookedSessions } from '@/app/api/users/components/UserBookedSessions';
import { getAllUsersSessions } from '@/src/utils/getAllUsersSessions';
import { Checkbox } from '@/components/ui/checkbox';

export default function Profile() {
	const email = useSearchParams().get('email');
	const [user, setUser] = useState<UserData | undefined>();
	const [sessions, setSessions] = useState([]);
	const [userSessions, setUserSessions] = useState([]);
	const [usersSessionsRegistered, setUsersSessionsRegistered] = useState([]);
	const [shouldRefetchSessions, setShouldRefetchSessions] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [viewDeleted, setViewDeleted] = useState(false);
	const router = useRouter();
	const { data } = useSession();

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

	const updateUserState = () => {
		getUserInfo();
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const getSessions = async () => {
		const allSessions = await getCoachSessions(email);
		allSessions && setSessions(allSessions.sessions);
	};

	const getUsersSessions = async () => {
		const allUsersSessions = await getAllUsersSessions(email);
		const updatedSessions = [];

		for (const userSession of allUsersSessions.sessions) {
			if (userSession.session.approvable && userSession.isConfirmed) {
				updatedSessions.push(userSession);
			} else if (!userSession.session.approvable) {
				updatedSessions.push(userSession);
			}
		}

		allUsersSessions && setUsersSessionsRegistered(updatedSessions);
	};

	useEffect(() => {
		getUsersSessions();
	}, []);

	const onSessionChange = () => {
		setShouldRefetchSessions(true);
	};

	useEffect(() => {
		getSessions();
	}, []);

	useEffect(() => {
		if (shouldRefetchSessions) {
			getSessions();
			getUsersSessions();
			setShouldRefetchSessions(false);
		}
	}, [shouldRefetchSessions]);

	const getWaitingPeople = async () => {
		const allWaitingApprovals = await getWaitingApprovals(email);
		allWaitingApprovals && setUserSessions(allWaitingApprovals.userSessions);
	};

	useEffect(() => {
		getWaitingPeople();
	}, []);

	const handleViewDeleted = () => {
		setViewDeleted(false);
	};

	return (
		<>
			<PageHeader title='User profile' subtitle='View profile details' />

			{user ? (
				<div className=''>
					<div className='flex w-full gap-6'>
						<Card className='w-full'>
							<CardHeader className='flex gap-4 flex-row items-center justify-between'>
								<div className='flex gap-4 flex-row items-center'>
									<Avatar>
										<AvatarFallback>{user.name[0].toUpperCase()}</AvatarFallback>
									</Avatar>
									<div>
										<CardTitle>{user.name}</CardTitle>
										<CardDescription>{user.email}</CardDescription>
									</div>
								</div>

								{data?.user?.email === user.email && (
									<ProfileDialog user={user} onUpdateUser={updateUserState} onClose={handleDialogClose} />
								)}
							</CardHeader>
							<div className='px-8'>
								<CardTitle>Description</CardTitle>
								<CardDescription>{user.description}</CardDescription>
							</div>
							<div className='px-8'>
								<CardTitle>Rating</CardTitle>
								<Stars rating={user.rating} />
								<CardDescription>{user.rating.toFixed(1)} out of 5 </CardDescription>
							</div>
							<CardContent className='grid gap-4'></CardContent>
						</Card>
						<Card className='w-full'>
							<CardHeader className='flex gap-4'>
								<div>
									<CardTitle>Role</CardTitle>
									<CardDescription>{user.role}</CardDescription>
								</div>
								{user.sports && (
									<div>
										<CardTitle>Sports</CardTitle>
										<Badge>{user.sports}</Badge>
									</div>
								)}
								<div>
									<CardTitle>Location</CardTitle>
									<CardDescription>{user.city}</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</div>
					<PageHeader
						title='My sessions'
						subtitle={user.role === 'user' ? 'View all reservations' : 'View my sessions'}
					/>
					<div className='flex items-center space-x-2'>
						<input type='checkbox' id='deleted' checked={viewDeleted} onChange={() => setViewDeleted(!viewDeleted)} />
						<label
							htmlFor='deleted'
							className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
						>
							Show deleted sessions
						</label>
					</div>
					{user.role === 'coach' && sessions?.length > 0 ? (
						sessions.map((session, index) => (
							<SessionDisplay
								key={index}
								session={session}
								user={user}
								email={email}
								onSessionChange={onSessionChange}
								viewDeleted={viewDeleted}
							/>
						))
					) : user.role === 'user' && usersSessionsRegistered?.length > 0 ? (
						usersSessionsRegistered.map((userSession, index) => (
							<UserBookedSessions
								key={index}
								userSession={userSession}
								user={user}
								email={email}
								onSessionChange={onSessionChange}
								viewDeleted={viewDeleted}
							/>
						))
					) : (
						<div className='mb-2'>
							{user.role === 'user' ? "You haven't joined any sessions." : "You haven't created any sessions."}
						</div>
					)}
					{user.role === 'coach' && data?.user?.email === user.email && (
						<Button variant='outline' onClick={() => router.push('/sessions')}>
							Add a session
						</Button>
					)}
					{user.role === 'user' && data?.user?.email === user.email && (
						<Button variant='outline' onClick={() => router.push('/sessions')}>
							Join a session
						</Button>
					)}

					{user.role === 'coach' && data?.user?.email === user.email && (
						<>
							<PageHeader
								title='Waiting approval'
								subtitle={'People waiting for your confirmation to join a session'}
							/>
							{userSessions && userSessions.length > 0 ? (
								userSessions.map((userSession, index) => (
									<ApprovalDisplay key={index} userSession={userSession} email={email} />
								))
							) : (
								<div className='mb-2'>No people awaiting confirmation.</div>
							)}
						</>
					)}
				</div>
			) : (
				<div className='flex items-center justify-center' style={{ marginTop: '13vh' }}>
					<div role='status'>
						<svg
							aria-hidden='true'
							className='w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
							viewBox='0 0 100 101'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
								fill='currentColor'
							/>
							<path
								d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
								fill='currentFill'
							/>
						</svg>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)}
		</>
	);
}

function StarIcon({ filled }) {
	return (
		<svg
			className={`w-4 h-4 ${filled ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-500'} ms-1`}
			aria-hidden='true'
			xmlns='http://www.w3.org/2000/svg'
			fill='currentColor'
			viewBox='0 0 22 20'
		>
			<path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
		</svg>
	);
}

function Stars({ rating }) {
	const filledStars = Math.floor(rating); // Number of filled stars
	const remainingStars = 5 - filledStars; // Number of empty stars

	return (
		<div className='flex items-center'>
			{[...Array(filledStars)].map((_, index) => (
				<StarIcon key={index} filled />
			))}
			{[...Array(remainingStars)].map((_, index) => (
				<StarIcon key={index} filled={false} />
			))}
		</div>
	);
}
