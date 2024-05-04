export async function getSessionById(sessionId) {
	try {
		const response = await fetch(`/api/sessions/byId/?sessionId=${sessionId}`);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			console.log({ error });
			return;
		}
	} catch (error) {
		console.error('Error fetching sessions1:', error);
		return;
	}
}
