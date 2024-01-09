// handles logout button click and prompts user with a modal to confirm logout
const handleLogOut = async event => {
	event.preventDefault();

	const logOutModal = new bootstrap.Modal(
		document.getElementById('logOutModal'),
		{
			keyboard: false,
		}
	);
	logOutModal.show();

	const logOutConfirm = document.getElementById('logOutConfirm');
	const logOutReject = document.getElementById('logOutReject');

	logOutConfirm.addEventListener('click', logOut);
	logOutReject.addEventListener('click', () => {
		logOutModal.hide();
	});
};

// logs out the user and redirects to login page. if logout fails, prompts user with a modal to try again or contact support via the logOutFail method
const logOut = async () => {
	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/login');
	} else {
		logOutModal.hide();
		logOutFail();
	}
};

// handles failed logout attempts by editing the logout modal to display an error message and a close button
const logOutFail = () => {
	const logOutModal = new bootstrap.Modal(
		document.getElementById('logOutModal'),
		{
			keyboard: false,
		}
	);

	const modalClose = document.getElementById('logOutReject');
	document.getElementById('logOutReject').innerHTML = 'Close';
	document.getElementById('logOutConfirm').style.display = 'none';
	document.getElementById('logOutModalLabel').innerHTML = 'Log Out Failed';
	document.getElementById('logOutModalBody').innerHTML =
		'Failed to log out. Please try again. If issue persists, contact technical support';

	logOutModal.show();

	modalClose.addEventListener('click', () => {
		logOutModal.hide();
	});
};

document.querySelector('#logout').addEventListener('click', handleLogOut);
