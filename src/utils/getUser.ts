export async function getUser() {
	try {
		const response = await fetch(`/api/users/`);

		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			console.log({ error });
			return;
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return;
	}
}
