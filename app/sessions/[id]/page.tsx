'use client';

import { useEffect, useState } from 'react';
import { getSingleSession } from '@/src/utils/getSingleSession';
import { PageHeader } from '@/src/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Session } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { addUserToSession } from '@/src/utils/addUserToSession';
import dayjs from 'dayjs';

import { isAllowedToRegister } from '../utils/isAllowedToRegister';
import { isRegistrationOpen } from '../utils/isRegistrationOpen';
import { isRegisteredToSession } from '../utils/isRegisteredToSession';
import { isApprovalNeeded } from '@/app/sessions/utils/isApprovalNeeded';
import { hasCoachGrantedPermission } from '@/app/sessions/utils/hasCoachGrantedPermission';

export default function Page({ params }) {
	const [session, setSession] = useState<Session>({});
	const [isRegistrationOpened, setRegistrationOpened] = useState(false);
	const [isRegistrationAllowed, setRegistrationAllowed] = useState(false);
	const [isWaitingForApproval, setWaitingForApproval] = useState(false);
	const [hasGrantedPermission, setGrantedPermission] = useState(false);
	const [isRegistered, setIsRegistered] = useState(false);
	const userSession = useSession();

	const getSession = async () => {
		const fetchedSession = await getSingleSession(params.id);
		fetchedSession && setSession(fetchedSession);

		const shouldShowButton = await isAllowedToRegister({
			user: userSession.data?.user,
			sessionId: fetchedSession.id,
		});

		setRegistrationAllowed(!!shouldShowButton);

		const shouldAllowRegistration = await isRegistrationOpen({
			sessionId: fetchedSession.id,
		});

		setRegistrationOpened(shouldAllowRegistration);

		const waitingForApproval = await isApprovalNeeded({
			approvable: fetchedSession.approvable,
			sessionId: fetchedSession.id,
			userId: userSession.data?.user?.id,
		});
		setWaitingForApproval(waitingForApproval);
		console.log('isWaitingForApproval: ', isWaitingForApproval);

		const permissionGranted = await hasCoachGrantedPermission({
			sessionId: fetchedSession.id,
			userId: userSession.data?.user?.id,
			approvable: fetchedSession.approvable,
		});
		setGrantedPermission(permissionGranted);

		const isAlreadyRegistered = await isRegisteredToSession({
			sessionId: fetchedSession.id,
			user: userSession.data?.user,
		});

		setIsRegistered(isAlreadyRegistered);
	};

	useEffect(() => {
		getSession();
	}, []);

	const handleUserRegistration = () => {
		addUserToSession({
			sessionId: session.id,
			userId: userSession.data?.user?.id,
			isConfirmed: !session?.approvable,
		});

		getSession();
	};
	console.log('approvable: ', session.approvable);
	console.log('hasGrantedPermission: ', hasGrantedPermission);

	const getButtonText = () => {
		if (!isRegistrationOpened) {
			return 'Registration is closed';
		}
		if (isWaitingForApproval) {
			return 'Waiting for coach to approve';
		}
		if (session.approvable && hasGrantedPermission) {
			return 'Coach approved you registration';
		}
		if (!session.approvable && isRegistered) {
			return 'You have already registered to this session';
		}
		if (isRegistrationAllowed) {
			return 'Register to this session';
		}
		//return isRegistrationAllowed ? 'Register to this session' : 'You can not register to this session';

		if (!isRegistrationAllowed) {
			return 'You can not register to this session';
		}
	};

	const buttonText = getButtonText();

	return (
		<>
			<PageHeader
				title='Session'
				subtitle='View session details'
				buttonText={buttonText}
				buttonVariant='outline'
				onButtonClick={handleUserRegistration}
				disabled={
					!isRegistrationAllowed ||
					!isRegistrationOpened ||
					isRegistered ||
					isWaitingForApproval ||
					hasGrantedPermission
				}
			/>

			{session ? (
				<div className=''>
					<div className='flex w-full gap-6'>
						<Card className='w-full'>
							<CardContent className='p-6 grid grid-cols-2 gap-5'>
								<div>
									<CardTitle>Title</CardTitle>
									<CardDescription>{session.title || '-'}</CardDescription>
								</div>
								<div>
									<CardTitle>Description</CardTitle>
									<CardDescription>{session.description || '-'}</CardDescription>
								</div>
								<div>
									<CardTitle>Coach email</CardTitle>
									<CardDescription>{session.coachEmail || '-'}</CardDescription>
								</div>
								<div>
									<CardTitle>City</CardTitle>
									<CardDescription>{session.city || '-'}</CardDescription>
								</div>
								{session.sport && (
									<div>
										<CardTitle>Sport</CardTitle>
										<Badge>{session.sport}</Badge>
									</div>
								)}
							</CardContent>
						</Card>
						<Card className='w-full'>
							<CardHeader className='p-6 grid grid-cols-2 gap-5'>
								<div>
									<CardTitle>Date</CardTitle>
									<CardDescription>{dayjs(session.date).format('YYYY-MM-DD')}</CardDescription>
								</div>
								<div>
									<CardTitle>Start time</CardTitle>
									<CardDescription>{session.sessionStart || '-'}</CardDescription>
								</div>
								<div>
									<CardTitle>End time</CardTitle>
									<CardDescription>{session.sessionFinish || '-'}</CardDescription>
								</div>
								<div>
									<CardTitle>Capacity</CardTitle>
									<CardDescription>{session.capacity || '-'}</CardDescription>
								</div>
								<div>
									<CardTitle>Places taken</CardTitle>
									<CardDescription>{session.UserSession?.length || '0'}</CardDescription>
								</div>
							</CardHeader>
						</Card>
					</div>
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
