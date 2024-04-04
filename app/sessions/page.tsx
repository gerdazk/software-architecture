'use client';
import { SessionDialog } from '@/src/components/Dialogs/SessionDialog';
import { PageHeader } from '@/src/components/PageHeader';
import { getAllSessions } from '@/src/utils/getAllSessions';
import React, { useEffect, useState } from 'react';
import { SessionTable } from './components/SessionTable';

const Sessions = () => {
	const [sessions, setSessions] = useState([]);

	const getSessions = async () => {
		const allSessions = await getAllSessions();
		allSessions && setSessions(allSessions.sessions);
	};

	useEffect(() => {
		getSessions();
	}, []);
	
	return (
		<div className='mx-auto flex-wrap items-center justify-between mx-auto p-4'>
			<SessionDialog />
			<PageHeader title='All sessions' />
			<div className='gap-6 flex flex-col'>
				<SessionTable data={sessions} />
			</div>
		</div>
	);
};

export default Sessions;
