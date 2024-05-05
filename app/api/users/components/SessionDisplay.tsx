import { Button } from '@/components/ui/button';
import { SessionDialog } from '@/src/components/Dialogs/SessionDialog';
import { useState } from 'react';
import { ImPushpin } from 'react-icons/im';
import { RiDeleteBinLine } from 'react-icons/ri';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useSession } from 'next-auth/react';
import dayjs from 'dayjs';

import { UsersDialog } from './UsersDialog';

export function SessionDisplay({ session, user, email, onSessionChange, viewDeleted }) {
	const hasSessionEnded = dayjs(Date.now()).isAfter(dayjs(session.date));
	const [isSessionOpen, setIsSessionOpen] = useState(session.joinable);
	const [isDeleted, setIsDeleted] = useState(false);
	const { data } = useSession();

	const closeSession = async () => {
		try {
			const response = await fetch('/api/sessions/joinableSessions', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ sessionId: session.id }),
			});

			if (response.ok) {
				setIsSessionOpen((prevState: boolean) => !prevState);
			} else {
				const error = await response.json();
				console.error('Error updating joinability:', error);
			}
		} catch (error) {
			console.error('Error updating joinability:', error);
		}
	};
	const deleteSession = async () => {
		try {
			const response = await fetch('/api/sessions/deleted', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ sessionId: session.id }),
			});

			if (response.ok) {
				setIsDeleted(true);
				console.log('Delete successful');
			} else {
				const error = await response.json();
				console.error('Error deleting:', error);
			}
		} catch (error) {
			console.error('Error deleting:', error);
		}
	};

	return (
		<>
			{!session.deleted && !viewDeleted && (
				<div className='flex items-center space-x-4 rounded-md border p-4'>
					<ImPushpin />
					<div className='flex-1 space-y-1'>
						<p className='text-sm font-medium leading-none'>{session.title}</p>
						<p className='text-sm text-muted-foreground'>{session.date.substring(0, 10)}</p>
					</div>

					{!session.deleted && data?.user?.email === email && (
						<>
							<UsersDialog
								hasSessionEnded={hasSessionEnded}
								users={session.UserSession}
								onSessionChange={onSessionChange}
							/>
							{!hasSessionEnded && <SessionDialog update session={session} />}
							{!hasSessionEnded &&
								(isSessionOpen ? (
									<Button
										variant='outline'
										className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
										onClick={() => closeSession()}
									>
										Close registration
									</Button>
								) : (
									<Button
										variant='outline'
										className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
										onClick={() => closeSession()}
									>
										Open registration
									</Button>
								))}
							<AlertDialog>
								<AlertDialogTrigger className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
									<RiDeleteBinLine />
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone!!!. This will permanently delete the session and remove all
											reservations to that session.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={() => deleteSession()}>Continue</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</>
					)}
				</div>
			)}
			{viewDeleted && (
				<div className={`flex items-center space-x-4 rounded-md border p-4 ${session.deleted ? 'opacity-30' : ''}`}>
					<ImPushpin />
					<div className='flex-1 space-y-1'>
						<p className='text-sm font-medium leading-none'>{session.title}</p>
						<p className='text-sm text-muted-foreground'>{session.date.substring(0, 10)}</p>
					</div>

					{!session.deleted && data?.user?.email === email && (
						<>
							<UsersDialog
								hasSessionEnded={hasSessionEnded}
								users={session.UserSession}
								onSessionChange={onSessionChange}
							/>
							{!hasSessionEnded && <SessionDialog update session={session} />}
							{!hasSessionEnded &&
								(isSessionOpen ? (
									<Button
										variant='outline'
										className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
										onClick={() => closeSession()}
									>
										Close registration
									</Button>
								) : (
									<Button
										variant='outline'
										className='text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
										onClick={() => closeSession()}
									>
										Open registration
									</Button>
								))}
							<AlertDialog>
								<AlertDialogTrigger className='text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>
									<RiDeleteBinLine />
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone!!!. This will permanently delete the session and remove all
											reservations to that session.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction onClick={() => deleteSession()}>Continue</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</>
					)}
				</div>
			)}
		</>
	);
}
