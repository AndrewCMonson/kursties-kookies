const router = require('express').Router();
const { Product } = require('../../models');
const withAuth = require('../../utils/auth');

// The `/api/products` endpoint that returns all products in the api
router.get('/', withAuth, async (req, res) => {
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

// Router for admin to update a product
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedProduct = await Product.update(
            {
            product_name: req.body.product_name,
			price: req.body.price,
			stock: req.body.stock,
			filename: req.body.filename,
			featured: req.body.featured,
			description: req.body.description,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ message: 'Product updated' });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Router for admin to delete a product
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedProduct = await Product.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ message: 'Product deleted' });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
	try {
		const productData = await Product.create({
			product_name: req.body.product_name,
			price: req.body.price,
			stock: req.body.stock,
			filename: req.body.filename,
			featured: req.body.featured,
			description: req.body.description,
		});
		res.status(200).json(productData);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
