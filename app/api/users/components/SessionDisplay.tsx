// SessionDisplay.jsx
import { SessionDialog } from '@/src/components/Dialogs/SessionDialog';
import { ImPushpin } from 'react-icons/im';

export function SessionDisplay({ session }) {
	if (!session) {
		return <div className='mb-2'>You haven't created any sessions.</div>;
	}

	return (
		<div className='flex items-center space-x-4 rounded-md border p-4'>
			<ImPushpin />
			<div className='flex-1 space-y-1'>
				<p className='text-sm font-medium leading-none'>{session.title}</p>
				<p className='text-sm text-muted-foreground'>{session.date.substring(0, 10)}</p>
			</div>
			<SessionDialog update session={session} />
		</div>
	);
}
