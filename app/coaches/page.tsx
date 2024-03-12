'use client';

import { getAllCoaches } from '@/src/utils/getAllCoaches';
import { useEffect, useState } from 'react';
import { PageHeader } from '@/src/components/PageHeader';
import { SingleCoachDisplay } from '@/app/coaches/components/SingleCoachDisplay';

export default function Page() {
	const [coaches, setCoaches] = useState([]);

	const getCoaches = async () => {
		const allCoaches = await getAllCoaches();
		allCoaches && setCoaches(allCoaches.users);
	};

	useEffect(() => {
		getCoaches();
	}, []);

	return (
		<div className='flex gap-3 w-full flex-col'>
			{coaches?.map(({ email, name }) => {
				return <SingleCoachDisplay name={name} email={email} key={email} />;
			})}
		</div>
	);
}
