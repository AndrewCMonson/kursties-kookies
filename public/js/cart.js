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
