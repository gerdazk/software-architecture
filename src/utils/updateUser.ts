interface UserData {
	name: string;
	email: string;
	city: string;
	description: string;
}

export async function updateUser({ name, email, city, description }: UserData) {
	try {
		const response = await fetch('/api/users/coaches/concreteCoach', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				city,
				description,
			}),
		});

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
