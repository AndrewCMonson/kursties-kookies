import { addAlert } from './utility.js';

// handles login form based on form submission
const handleLogin = async event => {
	event.preventDefault();
	const alertDiv = document.getElementById('loginAlertDiv');

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
	if (!email && !password) {
		addAlert('Please enter an email and password', 'danger', alertDiv);
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

// event listeners for login and signup forms
document.querySelector('.login-form').addEventListener('submit', handleLogin);
