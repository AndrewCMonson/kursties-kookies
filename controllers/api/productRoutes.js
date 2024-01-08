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

// The `/api/products/:id` endpoint that returns a single product by id
router.get('/:id', async (req, res) => {
	try {
		const productData = await Product.findByPk(req.params.id);
		if (!productData) {
			res.status(404).json({ message: 'No product found with that id!' });
			return;
		}
		res.status(200).json(productData);
	} catch (err) {
		res.status(500).json(err);
	}
});

//add a new product 
router.post('/', async (req, res) => {
	try {
		const newProduct = await Product.create(req.body);
		res.status(201).json(newProduct);

	} catch (err) {
		res.status(400).json(err);
	}
})

module.exports = router;
