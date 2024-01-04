module.exports = {
	check_stock: stock => {
		if (stock > 0) {
			return `In Stock`;
		} else {
			return `Out of Stock`;
		}
	},

	is_featured: product => {
		if (product.featured) {
			return true;
		} else {
			return false;
		}
	},
	calculate_total: (price, quantity) => {
		return price * quantity;
	}
};
