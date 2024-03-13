import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface SessionCrudModalProps {
	closeModal: () => void;
}

const SessionCrudModal: React.FC<SessionCrudModalProps> = ({ closeModal }) => {
	console.log('Opening component');
	const [startDate, setStartDate] = useState(new Date());

	const handleCloseModal = () => {
		console.log('Closing modal');
		closeModal();
	};

	return (
		<div
			id='crud-modal'
			tabIndex={-1}
			className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 bottom-0 left-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-75'
		>
			<div className='relative p-4 max-w-screen-md max-h-screen-md w-3/5 h-4/5'>
				<div className='relative bg-white rounded-lg shadow'>
					<div className='flex items-center justify-between p-4 border-b rounded-t'>
						<h3 className='text-lg font-semibold text-gray-900'>Create new session</h3>
						<button type='button' className='text-gray-400 hover:text-gray-900' onClick={handleCloseModal}>
							<span className='sr-only'>Close modal</span>
							<svg
								className='w-6 h-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
						</button>
					</div>
					<div className='mx-4 my-4'>
						{' '}
						{/* Add margin to the inner content */}
						<div className='space-y-4'>
							<div className='mb-6'>
								<label htmlFor='large-input' className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>
									Session title:
								</label>
								<input
									type='text'
									id='large-input'
									className='block w-5/6 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
							<label htmlFor='default' className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>
								Sport:
							</label>
							<select
								id='default'
								className='block w-2/3 px-4 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
							>
								<option selected></option>
								<option value='US'>Tennis</option>
								<option value='CA'>Baskteball</option>
								<option value='FR'>Golf</option>
							</select>
							<label htmlFor='default' className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>
								Location:
							</label>
							<div className='grid grid-cols-2 gap-x-4'>
								<div className='col-span-2 sm:col-span-1'>
									<label htmlFor='city' className='block text-sm font-medium text-gray-700'>
										Address
									</label>
									<input
										type='text'
										id='city'
										name='city'
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										placeholder='Enter full address'
									/>
								</div>
								<div>
									<label htmlFor='country' className='block text-sm font-medium text-gray-700'>
										City
									</label>
									<select
										id='country'
										name='country'
										className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
										defaultValue='Select country'
									>
										<option disabled>Select city</option>
										<option>Vilnius</option>
										<option>Kaunas</option>
									</select>
								</div>
							</div>
							<label htmlFor='default' className='block mb-2 text-base font-medium text-gray-900 dark:text-white'>
								Date & Time:
							</label>
							<div>
								<DatePicker
									selected={startDate}
									onChange={(date) => setStartDate(date)}
									className='block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
								/>
							</div>
							<div className='grid grid-cols-1 gap-y-2'>
								<label className='inline-flex items-center cursor-pointer'>
									<input type='checkbox' value='' className='sr-only peer'></input>
									<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peSer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									<span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>Recurring session</span>
								</label>
								<label className='inline-flex items-center cursor-pointer'>
									<input type='checkbox' value='' className='sr-only peer'></input>
									<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peSer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
									<span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
										Requires coach approval
									</span>
								</label>
							</div>
						</div>
						<form className='p-4'>
							{/* Form inputs */}
							<button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
								Create
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SessionCrudModal;
