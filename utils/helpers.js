module.exports = {
	// used to check the stock of an item and return a string accordingly
	check_stock: stock => {
		if (stock > 0) {
			return `In Stock`;
		} else {
			return `Out of Stock`;
		}
	},

	calculate_total: (price, quantity) => {
		let num = price * quantity;
		return num.toFixed(2);
	}
};
