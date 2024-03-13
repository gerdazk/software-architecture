'use client';
import { SessionDialog } from '@/src/components/Dialogs/SessionDialog';
import React from 'react';

const Sessions = () => {
	return (
		<div className='mx-auto flex flex-wrap items-center justify-between mx-auto p-4'>
			<SessionDialog />
		</div>
	);
};

export default Sessions;
