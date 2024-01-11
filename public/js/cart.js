import { addAlert } from './bootstrapUtils.js';

const addToCart = async event => {
	event.preventDefault();

	const productId = event.target.getAttribute('data-product-id');
	const alertDiv = document.getElementById('cartAlertDiv');

	const response = await fetch(`/api/users/cart/addItem/${productId}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		addAlert('Added to Cart!', 'success', alertDiv);
	} else if (response.statusText === 'Not Found') {
		addAlert('Please log in to add to cart', 'danger', alertDiv);
	} else {
		addAlert(
			'Failed to add to cart. If problem persists, contact technical support',
			'danger',
			alertDiv
		);
	}
};

const removeFromCart = async productId => {
	// const productId = event.target.getAttribute('data-product-id');

	const response = await fetch(`/api/users/cart/removeItem/${productId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		showDeleteSuccessModal();
		document.location.reload();
	} else {
		removeFromCartFail();
	}
};
const showDeleteSuccessModal = () => {
	const deleteSuccessModal = new bootstrap.Modal(
		document.getElementById('deleteSuccessModal'),
		{
			keyboard: false,
		}
	);
	deleteSuccessModal.show();

		setTimeout(() => {
		deleteSuccessModal.hide();
	}, 2000);
};

const handleDeleteItem = async event => {
	event.preventDefault();

	const productId = event.target.getAttribute('data-product-id');

	const cartDeleteModal = new bootstrap.Modal(
		document.getElementById('cartDeleteModal'),
		{
			keyboard: false,
		}
	);
	cartDeleteModal.show();

	const cartDeleteConfirm = document.getElementById('cartDeleteConfirm');
	const cartDeleteReject = document.getElementById('cartDeleteReject');

	cartDeleteConfirm.addEventListener('click', () => {
		removeFromCart(productId);
	});
	cartDeleteReject.addEventListener('click', () => {
		cartDeleteModal.hide();
	});
};

const removeFromCartFail = () => {
	const cartDeleteModal = new bootstrap.Modal(
		document.getElementById('cartDeleteModal'),
		{
			keyboard: false,
		}
	);

	const modalClose = document.getElementById('cartDeleteReject');
	document.getElementById('cartDeleteReject').innerHTML = 'Close';
	document.getElementById('cartDeleteConfirm').style.display = 'none';
	document.getElementById('cartDeleteModalLabel').innerHTML =
		'Remove From Cart Failed';
	document.getElementById('cartDeleteModalBody').innerHTML =
		'Failed to remove from cart. Please try again. If issue persists, contact technical support';

	cartDeleteModal.show();

	modalClose.addEventListener('click', () => {
		cartDeleteModal.hide();
	});
};

document.querySelectorAll('.remove-from-cart').forEach(button => {
	button.addEventListener('click', handleDeleteItem);
});

document.querySelectorAll('.addToCartButton').forEach(button => {
	button.addEventListener('click', addToCart);
});
