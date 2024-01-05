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
	}
};
