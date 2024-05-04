import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Session, User, UserSession } from '@prisma/client';

import { RateUserDialog } from './RateUserDialog';
import { RateCoachDialog } from '@/app/api/users/components/RateCoachDialog';
import { useEffect, useState } from 'react';
import { getSessionById } from '@/src/utils/getSessionById';

export function UsersSessionsDialog({ userSession, hasSessionEnded, onSessionChange }) {
	const [session, setSession] = useState();

	const getSession = async () => {
		const thisSession = await getSessionById(userSession.sessionId);
		thisSession && setSession(thisSession.session);
	};

	useEffect(() => {
		getSession();
	}, []);

	useEffect(() => {
		// This will log the session id only when session is updated
		if (session && session.id) {
			//console.log('Coach ID: ', session);
		}
	}, [session]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				{hasSessionEnded && (
					<Button
						variant='outline'
						className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
						disabled={userSession.isCoachRated}
					>
						{userSession.isCoachRated ? 'Rating submited' : 'Rate coach'}
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className='sm:max-w-[775px]'>
				<DialogHeader>
					<DialogTitle>Coach: </DialogTitle>
				</DialogHeader>
				{session && (
					<div className='flex flex-col gap-3'>
						<Card className='flex items-center justify-between'>
							<CardHeader>
								<CardTitle>{session.coachEmail}</CardTitle>
							</CardHeader>
							{hasSessionEnded && !userSession.isCoachRated && (
								<RateCoachDialog
									coachEmail={session.coachEmail}
									userId={userSession.userId}
									sessionId={userSession.sessionId}
									onSessionChange={onSessionChange}
								/>
							)}
						</Card>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
