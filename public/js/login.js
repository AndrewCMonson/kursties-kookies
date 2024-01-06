// handles login form based on form submission
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

		checkLogin(response);
	}
};

// checks if the login was successful and redirects to the homepage
const checkLogin = async response => {
	const alertDiv = document.getElementById('loginAlertDiv');
	const loginMessage = await response.json();

	if (response.ok) {
		document.location.replace('/');
	} else if (
		loginMessage.message === 'Incorrect email or password, please try again'
	) {
		addAlert('Incorrect email or password', 'danger', alertDiv);
	} else {
		addAlert(
			'Error logging in. If issue persists, contact technical support',
			'danger',
			alertDiv
		);
	}
};

// handles signup form based on form submission
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

const addAlert = (message, type, div) => {
	const wrapper = document.createElement('div');
	wrapper.innerHTML = [
		`<div class="alert alert-${type} alert-dismissible" role="alert">`,
		`   <div>${message}</div>`,
		'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
		'</div>',
	].join('');

	div.append(wrapper);
};

// client side validation for signup form inputs {password
const checkPassword = password => {
	const alertDiv = document.getElementById('signUpAlertDiv');
	const signUpBtn = document.getElementById('signUpBtn');
	const confirmPassword = document.getElementById('confirmPassword').value;
	// regex for password validation (at least one number, one lowercase letter, one uppercase letter, and at least 8 characters)
	const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

	if (!password || !confirmPassword) {
		addAlert('Please enter a password', 'danger', alertDiv);
		signUpBtn.disabled = true;
		return false;
	} else if (passwordRegex.test(password) === false) {
		addAlert(
			'Your password needs to contain at least one number, one lowercase letter, and one uppercase letter',
			'danger',
			alertDiv
		);
		signUpBtn.disabled = true;
		return false;
	} else if (password !== confirmPassword) {
		addAlert('Your passwords do not match', 'danger', alertDiv);
		signUpBtn.disabled = true;
		return false;
	} else {
		signUpBtn.disabled = false;
		return true;
	}
};

// client side validation for signup form inputs {email}
const checkEmail = async email => {
	const alertDiv = document.getElementById('signUpAlertDiv');
	const signUpBtn = document.getElementById('signUpBtn');

	const users = await fetch('/api/users').then(res => res.json());
	const existingUser = users.find(user => user.email === email);

	if (!email) {
		addAlert('Please enter an email', 'danger', alertDiv);
		signUpBtn.disabled = true;
		return false;
	} else if (existingUser) {
		addAlert('Email already in use', 'danger', alertDiv);
		signUpBtn.disabled = true;
		return false;
	} else {
		signUpBtn.disabled = false;
		return true;
	}
};

// client side validation for signup form inputs {username}
const checkUsername = async username => {
	const alertDiv = document.getElementById('signUpAlertDiv');
	const signUpBtn = document.getElementById('signUpBtn');

	const users = await fetch('/api/users').then(res => res.json());
	const existingUser = users.find(user => user.username === username);

	if (username.length < 4) {
		addAlert(
			'Your username needs to be at least 4 characters',
			'danger',
			alertDiv
		);
		signUpBtn.disabled = true;
		return false;
	} else if (existingUser) {
		addAlert('Username already in use', 'danger', alertDiv);
		signUpBtn.disabled = true;
		return false;
	} else {
		signUpBtn.disabled = false;
		return true;
	}
};

// event listeners for login and signup forms
document.querySelector('.login-form').addEventListener('submit', handleLogin);

document.querySelector('.signup-form').addEventListener('submit', handleSignup);
