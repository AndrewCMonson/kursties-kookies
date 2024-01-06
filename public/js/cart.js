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
	} else {
		addAlert('Failed to add to cart. If problem persists, contact technical support', 'danger', alertDiv);
	}
};

const removeFromCart = async event => {
	event.preventDefault();

	const productId = event.target.getAttribute('data-product-id');
	const alertDiv = document.getElementById('cartAlertDiv');

	const response = await fetch(`/api/users/cart/removeItem/${productId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		alert('Deleted From Cart!');
		document.location.reload();
	} else {
		alert('Failed to remove from cart');
	}
};

document.querySelectorAll('.remove-from-cart').forEach(button => {
	button.addEventListener('click', removeFromCart);
});

document.querySelectorAll('.addToCartButton').forEach(button => {
	button.addEventListener('click', addToCart);
});
