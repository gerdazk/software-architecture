import { UsersDialog } from '@/app/api/users/components/UsersDialog';
import { UsersSessionsDialog } from '@/app/api/users/components/UsersSessionsDialog';
import { getSessionById } from '@/src/utils/getSessionById';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { ImPushpin } from 'react-icons/im';

export function UserBookedSessions({ userSession, user, email, onSessionChange, viewDeleted }) {
	const hasSessionEnded = dayjs(Date.now()).isAfter(dayjs(userSession.session.date));

	return (
		<>
			{!userSession.session.deleted && !viewDeleted && (
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
			)}
			{viewDeleted && (
				<>
					{!userSession.session.deleted ? (
						<div className={`flex items-center space-x-4 rounded-md border p-4 `}>
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
					) : (
						<div className={`flex items-center space-x-4 rounded-md border p-4 opacity-40`}>
							<ImPushpin />
							<div className='flex-1 space-y-1'>
								<p className='text-sm font-medium leading-none'>{userSession.session.title}</p>
							</div>

							<p className='text-sm font-medium leading-none'>{dayjs(userSession.session.date).format('YYYY-MM-DD')}</p>
							<p className='text-sm font-medium leading-none'>{userSession.session.sessionStart}</p>
						</div>
					)}
				</>
			)}
		</>
	);
}
