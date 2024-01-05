const Product = require('../models/Product');


const productData = [
    {
        product_name: 'Plain Ole Chocolate Chip',
        price: 2.00,
        stock: 10,
        featured: true,
        filename: '01-chocolate-chip.jpg',
        product_id: 1,
    },
    {
        product_name: 'Peanut Butter',
        price: 2.50,
        stock: 0,
        filename: '02-peanut-butter.jpg',
        product_id: 2,
    },
    {
        product_name: 'Oatmeal Raisin',
        price: 2.50,
        stock: 10,
        filename: '03-oatmeal-raisin.jpg',
        product_id: 3,
    },
    {
        product_name: 'White Chocolate Macadamia',
        price: 2.50,
        stock: 10,
        filename: '04-white-chocolate-macadamia.jpg',
        product_id: 4,
    },
    {
        product_name: 'Sugar',
        price: 2.00,
        stock: 10,
        filename: '05-sugar.jpg',
        product_id: 5,
    },
    {
        product_name: 'Snickerdoodle',
        price: 2.50,
        stock: 10,
        filename: '06-snickerdoodle.jpg',
        product_id: 6,
    },
    
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;