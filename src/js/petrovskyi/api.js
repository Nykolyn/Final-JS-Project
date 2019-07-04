export const postUser = async (user) => {
	const url = "http://localhost:3000/users"
	const settings = {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify(user)
	};
	try {
		const response = await fetch(url, settings);
		const users = response.json();
		return users;
	} catch (err) {
		throw err;
	}
};
export const getUser = async () => {
	const url = "http://localhost:3000/users"
	try {
		const response = await fetch(url)
		const users = response.json()
		return users
	} catch (err) {
		throw err;
	}
};

