const Product = require('../models/Product');

const productData = [
	{
		product_name: 'Chocolate Chip',
		price: 10.00,
		stock: 10,
		featured: true,
		filename: '01-chocolate-chip.jpg',
        description: 'A delicious chocolate chip cookie.',
	},
	{
		product_name: 'Peanut Butter',
		price: 12.50,
		stock: 0,
		featured: false,
		filename: '02-peanut-butter.jpg',
        description: 'A delicious peanut butter cookie.',
	},
	{
		product_name: 'Oatmeal Raisin',
		price: 12.50,
		stock: 10,
		featured: true,
		filename: '03-oatmeal-raisin.jpg',
        description: 'A delicious oatmeal raisin cookie.',
	},
	{
		product_name: 'White Chocolate Macadamia',
		price: 13.25,
		stock: 10,
		featured: false,
		filename: '04-white-chocolate-macadamia.jpg',
        description: 'A delicious white chocolate macadamia cookie.',
	},
	{
		product_name: 'Sugar',
		price: 10.00,
		stock: 10,
		featured: true,
		filename: '05-sugar.jpg',
        description: 'A delicious sugar cookie.',
	},
	{
		product_name: 'Snickerdoodle',
		price: 15.00,
		stock: 10,
		featured: true,
		filename: '06-snickerdoodle.jpg',
        description: 'A delicious snickerdoodle cookie.',
	},
	{
		product_name: 'Double Chocolate',
		price: 15.00,
		stock: 10,
		featured: false,
		filename: '07-double-chocolate.jpg',
        description: 'A delicious double chocolate cookie.',
	},
	{
		product_name: 'Molasses',
		price: 15.00,
		stock: 4,
		featured: false,
		filename: '08-molasses.jpg',
        description: 'A delicious molasses cookie.',
	},
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
