const { Product } = require('../models');


const productData = [
    {
        name: 'Plain Ole Chocolate Chip',
        price: 2.00,
        stock: 10,
        featured: true,
        filename: '01-chocolate-chip.jpg',
        // category_id: 1,
    },
    {
        name: 'Peanut Butter',
        price: 2.50,
        stock: 0,
        filename: '02-peanut-butter.jpg',
        // category_id: 1,
    },
    {
        name: 'Oatmeal Raisin',
        price: 2.50,
        stock: 10,
        filename: '03-oatmeal-raisin.jpg',
        // category_id: 1,
    },
    {
        name: 'White Chocolate Macadamia',
        price: 2.50,
        stock: 10,
        filename: '04-white-chocolate-macadamia.jpg',
        // category_id: 1,
    },
    {
        name: 'Sugar',
        price: 2.00,
        stock: 10,
        filename: '05-sugar.jpg',
        // category_id: 1,
    },
    {
        name: 'Snickerdoodle',
        price: 2.50,
        stock: 10,
        filename: '06-snickerdoodle.jpg',
        // category_id: 1,
    },
    
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;