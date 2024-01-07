// handles login and signup forms based on form submission on respective forms
const handleLogin = async event => {
	event.preventDefault();

	const email = document.querySelector('#inputEmail').value.trim();
	const password = document.querySelector('#inputPassword').value.trim();

	if (email && password) {
		const response = await fetch('/api/users/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to log in');
			console.log(response);
		}
	}
};

const handleSignup = async event => {
	event.preventDefault();

	const username = document.querySelector('#signUpUsername').value.trim();
	const email = document.querySelector('#signUpEmail').value.trim();
	const password = document.querySelector('#signUpPassword').value.trim();

	// fetch all users to find if the email is already in use
	const users = await fetch('/api/users').then(res => res.json());
	const existingUser = users.find(user => user.email === email);

	if (username.length > 3 && !existingUser && password) {
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});

		if (response.ok) {
			document.location.replace('/');
		} else {
			alert('Failed to sign up');
		}
	}
	if (existingUser) {
		alert('Email already in use');
		document.location.reload();
	}
};

document.querySelector('.login-form').addEventListener('submit', handleLogin);

document.querySelector('.signup-form').addEventListener('submit', handleSignup);
