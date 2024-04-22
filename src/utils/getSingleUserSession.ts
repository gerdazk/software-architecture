export async function getSingleUserSession(sessionId: string, userId: string) {
	try {
		const response = await fetch(`/api/userSessions/singleUserSession/?sessionId=${sessionId}&userId=${userId}`);

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			console.log({ error });
			return null;
		}
	} catch (error) {
		console.error('Error fetching userSession:', error);
		return null;
	}
}
