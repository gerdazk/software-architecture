import { UsersDialog } from '@/app/api/users/components/UsersDialog';
import { UsersSessionsDialog } from '@/app/api/users/components/UsersSessionsDialog';
import { getSessionById } from '@/src/utils/getSessionById';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ImPushpin } from 'react-icons/im';

export function UserBookedSessions({ userSession, user, email, onSessionChange }) {
	const hasSessionEnded = dayjs(Date.now()).isAfter(dayjs(userSession.session.date));

	return (
		<div className='flex items-center space-x-4 rounded-md border p-4'>
			<ImPushpin />
			<div className='flex-1 space-y-1'>
				<p className='text-sm font-medium leading-none'>{userSession.session.title}</p>
			</div>
			<UsersSessionsDialog
				hasSessionEnded={hasSessionEnded}
				userSession={userSession}
				onSessionChange={onSessionChange}
			/>
			<p className='text-sm font-medium leading-none'>{dayjs(userSession.session.date).format('YYYY-MM-DD')}</p>
			<p className='text-sm font-medium leading-none'>{userSession.session.sessionStart}</p>
		</div>
	);
}
