const Product = require('../models/Product');

const productData = [
	{
		product_name: 'Chocolate Chip',
		price: 2.0,
		stock: 10,
		featured: true,
		filename: '01-chocolate-chip.jpg',
	},
	{
		product_name: 'Peanut Butter',
		price: 2.5,
		stock: 0,
		featured: false,
		filename: '02-peanut-butter.jpg',
	},
	{
		product_name: 'Oatmeal Raisin',
		price: 2.5,
		stock: 10,
		featured: true,
		filename: '03-oatmeal-raisin.jpg',
	},
	{
		product_name: 'White Chocolate Macadamia',
		price: 2.5,
		stock: 10,
		featured: false,
		filename: '04-white-chocolate-macadamia.jpg',
	},
	{
		product_name: 'Sugar',
		price: 2.0,
		stock: 10,
		featured: true,
		filename: '05-sugar.jpg',
	},
	{
		product_name: 'Snickerdoodle',
		price: 2.5,
		stock: 10,
		featured: true,
		filename: '06-snickerdoodle.jpg',
	},
	{
		product_name: 'Double Chocolate',
		price: 2.5,
		stock: 10,
		featured: false,
		filename: '07-double-chocolate.jpg',
	},
	{
		product_name: 'Molasses',
		price: 4.5,
		stock: 4,
		featured: false,
		filename: '08-molasses.jpg',
	},
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
