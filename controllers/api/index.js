const router = require('express').Router();

const productRoutes = require('./product-routes.js');

router.use('/products', productRoutes);

module.exports = router;