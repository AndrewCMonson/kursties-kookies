const router = require('express').Router();
const { Product } = require('../../models');

// The `/api/products` endpoint that returns all products in the api
router.get('/', async (req, res) => {
    try {
        const productData = await Product.findAll();
        res.status(200).json(productData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;