const Product = require('../models/Product');


const productData = [
    {
        product_name: 'Chocolate Chip',
        price: 2.00,
        stock: 10,
        featured: true,
        filename: '01-chocolate-chip.jpg',
        
    },
    {
        product_name: 'Peanut Butter',
        price: 2.50,
        stock: 0,
        featured: false,
        filename: '02-peanut-butter.jpg',
        
    },
    {
        product_name: 'Oatmeal Raisin',
        price: 2.50,
        stock: 10,
        featured: true,
        filename: '03-oatmeal-raisin.jpg',
        
    },
    {
        product_name: 'White Chocolate Macadamia',
        price: 2.50,
        stock: 10,
        featured: false,
        filename: '04-white-chocolate-macadamia.jpg',
        
    },
    {
        product_name: 'Sugar',
        price: 2.00,
        stock: 10,
        featured: true,
        filename: '05-sugar.jpg',
        
    },
    {
        product_name: 'Snickerdoodle',
        price: 2.50,
        stock: 10,
        featured: true,
        filename: '06-snickerdoodle.jpg',
        
    },
    
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;