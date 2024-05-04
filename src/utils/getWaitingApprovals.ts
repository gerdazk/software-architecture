export async function getWaitingApprovals(email) {
	try {
		const response = await fetch(`/api/userSessions/?email=${email}`);
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
