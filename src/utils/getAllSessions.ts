export const getAllSessions = async () => {
	try {
		const response = await fetch('/api/sessions');

		if (response.ok) {
			const data = await response.json();
            console.log({data})
			return data;
		} else {
			const error = await response.json();
			console.log({ error });
			return;
		}
	} catch (error) {
		console.error('Error fetching sessions:', error);
		return;
	}
};
