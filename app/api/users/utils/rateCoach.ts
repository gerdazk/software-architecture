export const rateCoach = async (props: { coachEmail: string; userId: number; sessionId: string; rating: string }) => {
	try {
		const response = await fetch('/api/users/coaches/rating', {
			method: 'POST',
			body: JSON.stringify(props),
		});
		console.log('TEST ', JSON.stringify(props));
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			const error = await response.json();
			console.log({ error });
			return;
		}
	} catch (error) {
		console.error('Error updating rating:', error);
		return;
	}
};
