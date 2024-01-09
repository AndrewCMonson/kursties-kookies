const router = require('express').Router();

const productRoutes = require('./productRoutes.js');
const userRoutes = require('./userRoutes.js');
const mailRoutes = require('./mailRoutes.js');


router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/mail', mailRoutes);


module.exports = router;
