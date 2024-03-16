interface SessionData {
	title: string;
	sport: string;
	city: string;
	date: Date;
	sessionStart: string;
	sessionFinish: string;
	capacity: number;
	description: string;
	type: boolean;
	approvable: boolean;
	coachEmail: string;
}

export async function createSession({
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
	coachEmail
}: SessionData) {
	try {
		const response = await fetch('/api/sessions', {
			method: 'POST',
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
				coachEmail
			}),
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Session created successfully:', data);
			return data;
		} else {
			const error = await response.json();
			console.error('Session creation failed:', error);
			return;
		}
	} catch (error) {
		console.error('Error creating session:', error);
		return;
	}
}
