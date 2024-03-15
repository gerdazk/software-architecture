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
}) {
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
			}),
		});

		if (response.ok) {
			const data = await response.json();
			console.log('Session created successfully:', data.session);
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
