const addToCart = async (event) => {
    event.preventDefault();

    const productId = event.target.getAttribute('data-product-id');
    const userId = event.target.getAttribute('data-user-id');

    const response = await fetch(`/api/users/${userId}/cart/addItem/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        alert('Added to cart!');
    } else {
        alert('Failed to add to cart');
    }
};

document.querySelectorAll('.addToCartButton').forEach(button => {
    button.addEventListener('click', addToCart);
});

const handleRemoveFromCart = async (event) => {
    event.preventDefault();

    const productId = event.target.getAttribute('data-product-id');

    const sessionResponse = await fetch('/api/users/session', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const response = await fetch(`/api/users/${userId}/cart/removeItem/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        alert('Removed from cart!');
        document.location.reload();
    } else {
        alert('Failed to remove from cart');
    }
}
