module.exports = {
	// used to check the stock of an item and return a string accordingly
	check_stock: stock => {
		if(stock <= 2){
			return 'Going Fast! Order Soon!'
		} else if(stock >= 3){
			return 'In Stock'
		} else {
			return 'Out of Stock'
		}
	},
	// used to calculate the total price of an item
	calculate_total: (price, quantity) => {
		let num = price * quantity;
		return num.toFixed(2);
	},
	// used to calculate the total price of an order
	// TODO: add a checkout feature that will calculate the total price of an order
	calculate_order_sub_total: (arr) => {
		let total = 0;
		arr.forEach(item => {
			total += item.price * item.CartItem.quantity;
		})
		return total.toFixed(2);
	},

	calculate_order_tax: (arr) => {
		let total = 0;
		arr.forEach(item => {
			total += item.price * item.CartItem.quantity;
		})
		return (total * .06).toFixed(2);
	},

	calculate_order_total: (arr) => {
		let total = 0;
		arr.forEach(item => {
			total += item.price * item.CartItem.quantity;
		})
		return (total * 1.06).toFixed(2);
	}
};
