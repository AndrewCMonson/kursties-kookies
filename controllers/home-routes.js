const router = require('express').Router();
const { Product } = require('../models');

// const withAuth = require('../utils/auth');

// GET all products for homepage
router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll();

        const products = productData.map((product) => product.get({ plain: true }));

        res.render('homepage', {
            products,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one product
router.get('/product/:id', async (req, res) => {
    try {
        const productData = await Product.findByPk(req.params.id);
        
        const product = productData.get({ plain: true });
        

        res.render('product',
            {product}
        );
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;