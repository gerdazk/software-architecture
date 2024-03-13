'use client';
import SessionCrudModal from '@/app/sessions/components/sessionCrudModal';
import { SessionDialog } from '@/src/components/Dialogs/SessionDialog';
import React, { useState } from 'react';

const Sessions = () => {
	const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

	// Function to toggle modal state
	const toggleModal = () => {
		console.log('Toggling modal');
		setModalOpen(!modalOpen);
	};

	return (
		<div className='mx-auto flex flex-wrap items-center justify-between mx-auto p-4'>
			<button
				type='button'
				className='text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
				onClick={toggleModal} // Attach onClick event to open modal
			>
				Create session
			</button>
			<SessionDialog />
			{/* Render modal component if modalOpen state is true */}
			{modalOpen && <SessionCrudModal closeModal={toggleModal} />}
		</div>
	);
};

export default Sessions;
