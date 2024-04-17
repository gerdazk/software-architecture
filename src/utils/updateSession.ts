interface SessionData {
	title: string;
	sport: string;
	city: string;
	date: string;
	sessionStart: string;
	sessionFinish: string;
	capacity: number;
	description: string;
	type: boolean;
	approvable: boolean;
	coachEmail: string;
	id: string;
}

export async function updateSession({
	title,
	sport,
	city,
	date,
	sessionStart,
	sessionFinish,
	capacity,
	description,
	type,
	approvable,
	coachEmail,
	id,
}: SessionData) {
	try {
		const response = await fetch('/api/sessions', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				sport,
				city,
				date,
				sessionStart,
				sessionFinish,
				capacity,
				description,
				type,
				approvable,
				coachEmail,
				id,
			}),
		});
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			console.error('Session updated failed:', error);
			return;
		}
	} catch (error) {
		console.error('Error session updated:', error);
		return;
	}
}
