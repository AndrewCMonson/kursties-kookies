const router = require('express').Router();

const productRoutes = require('./productRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/products', productRoutes);
router.use('/users', userRoutes);

module.exports = router;