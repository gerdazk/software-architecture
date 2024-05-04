export async function getAllUsersSessions(email) {
	try {
		const response = await fetch(`/api/sessions/usersSessions/?email=${email}`);
		console.log('USER email: ', email);
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
