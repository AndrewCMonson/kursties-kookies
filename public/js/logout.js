// handles logout button click
const handleLogOut = async () => {
	const response = await fetch('/api/users/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/login');
	} else {
		// TODO add a modal to confirm logout and redirect to homepage
		alert('Failed to log out');
	}
};

document.querySelector('#logout').addEventListener('click', handleLogOut);
