export async function updateUser({ email, name, city, sports, description }: UserData) {
	try {
		const sportsString = sports.join(', ');

		const response = await fetch('/api/users', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				name,
				city,
				sports: sportsString,
				description,
			}),
		});
		console.log('Sports in updateUser are: ', sportsString);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			console.error('User updated failed:', error);
			return;
		}
	} catch (error) {
		console.error('Error user updated:', error);
		return;
	}
}
