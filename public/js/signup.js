import { addAlert } from './bootstrapUtils.js';

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
			const signUpModal = new bootstrap.Modal(document.getElementById('signUpModal'), {
				keyboard: false
			});
			signUpModal.show();

			const modalCloseBtn = document.getElementById('signUpModalClose');

			modalCloseBtn.addEventListener('click', () => {
				document.location.replace('/login');
			});
			
            // document.location.replace('/login');
		} else {
			addAlert(
				'Error signing up. If issue persists, contact technical support',
				'danger',
				alertDiv
			);
		}
	}
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

document.querySelector('.signup-form').addEventListener('submit', handleSignup);
