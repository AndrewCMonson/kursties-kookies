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

	const validUsername = checkUsername(username);
	const validEmail = checkEmail(email);
	const validPassword = checkPassword(password);

	if (validUsername && validPassword && validEmail) {
		const response = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ username, email, password }),
			headers: { 'Content-Type': 'application/json' },
		});
		if (response.ok) {
			// TODO add a modal to confirm signup and redirect to login
		} else {
			alert('Failed to sign up');
			console.log(response);
		}
	}
};

document.querySelector('.login-form').addEventListener('submit', handleLogin);

document.querySelector('.signup-form').addEventListener('submit', handleSignup);

// client side validation for signup form inputs {username, email, password}
const checkPassword = password => {
	const alertDiv = document.getElementById('alertDiv');
	const signUpBtn = document.getElementById('signUpBtn');

	const addAlert = (message, type) => {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = [
			`<div class="alert alert-${type} alert-dismissible" role="alert">`,
			`   <div>${message}</div>`,
			'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
			'</div>',
		].join('');

		alertDiv.append(wrapper);
	};

	const confirmPassword = document.getElementById('confirmPassword').value;

	if (!password || !confirmPassword) {
		addAlert('Please enter a password', 'warning');
		signUpBtn.disabled = true;
		return false;
	} else if (password.length < 8) {
		addAlert('Your password needs to be at least 8 characters', 'warning');
		signUpBtn.disabled = true;
		return false;
	} else if (password !== confirmPassword) {
		addAlert('Your passwords do not match', 'warning');
		signUpBtn.disabled = true;
		return false;
	} else {
		signUpBtn.disabled = false;
		return true;
	}
};

const checkEmail = async email => {
	const alertDiv = document.getElementById('alertDiv');
	const signUpBtn = document.getElementById('signUpBtn');

	const addAlert = (message, type) => {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = [
			`<div class="alert alert-${type} alert-dismissible" role="alert">`,
			`   <div>${message}</div>`,
			'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
			'</div>',
		].join('');

		alertDiv.append(wrapper);
	};

	const users = await fetch('/api/users').then(res => res.json());
	const existingUser = users.find(user => user.email === email);

	if (!email) {
		addAlert('Please enter an email', 'warning');
		signUpBtn.disabled = true;
		return false;
	} else if (existingUser) {
		addAlert('Email already in use', 'warning');
		signUpBtn.disabled = true;
		return false;
	} else {
		signUpBtn.disabled = false;
		return true;
	}
};

const checkUsername = async username => {
	const alertDiv = document.getElementById('alertDiv');
	const signUpBtn = document.getElementById('signUpBtn');

	const addAlert = (message, type) => {
		const wrapper = document.createElement('div');
		wrapper.innerHTML = [
			`<div class="alert alert-${type} alert-dismissible" role="alert">`,
			`   <div>${message}</div>`,
			'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
			'</div>',
		].join('');

		alertDiv.append(wrapper);
	};

	const users = await fetch('/api/users').then(res => res.json());
	const existingUser = users.find(user => user.username === username);

	if (username.length < 4) {
		addAlert('Your username needs to be at least 4 characters', 'warning');
		signUpBtn.disabled = true;
		return false;
	} else if (existingUser) {
		addAlert('Username already in use', 'warning');
		return false;
	} else {
		signUpBtn.disabled = false;
		return true;
	}
};
