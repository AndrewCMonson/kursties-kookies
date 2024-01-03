const { Product } = require('../models');


const productData = [
    {
        name: 'Plain Ole Chocolate Chip',
        price: 2.00,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Peanut Butter',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Oatmeal Raisin',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'White Chocolate Macadamia',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Sugar',
        price: 2.00,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Snickerdoodle',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Chocolate Chip',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Peanut Butter',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Oatmeal Raisin',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'White Chocolate Macadamia',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Sugar',
        price: 2.00,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Snickerdoodle',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Chocolate Chip',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
    {
        name: 'Peanut Butter',
        price: 2.50,
        stock: 10,
        // category_id: 1,
    },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;