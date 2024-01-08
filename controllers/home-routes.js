const router = require('express').Router();
const { Product, User, Cart, CartItem } = require('../models');

// GET all products for homepage
router.get('/', async (req, res) => {
	try {
		const productData = await Product.findAll({
			where: {
				featured: true,
			},
		});

		const products = productData.map(product => product.get({ plain: true }));

		res.render('homepage', {
			products,
			loggedIn: req.session.loggedIn,
			userId: req.session.user_id,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get('/products', async (req, res) => {
	try {
		const productData = await Product.findAll();

		const products = productData.map(product => product.get({ plain: true }));

		res.render('products', {
			products,
			loggedIn: req.session.loggedIn,
			userId: req.session.user_id,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GET one product
router.get('/products/:id', async (req, res) => {
	try {
		const productData = await Product.findByPk(req.params.id);

		const product = productData.get({ plain: true });

		const additionalProductData = await Product.findAll({
			where: {
				featured: true,
			},
		});

		const additionalProducts = additionalProductData.map(product =>
			product.get({ plain: true })
		);

		res.render('product', {
			product,
			additionalProducts,
			loggedIn: req.session.loggedIn,
			userId: req.session.user_id,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

// GETs and renders a user's cart based on their id
router.get('/cart', async (req, res) => {
	try {
		const user = await User.findByPk(req.session.user_id, {
			include: {
				model: Cart,
				include: {
					model: Product,
					through: CartItem,
				},
			},
		});

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const userCart = user.cart.products;

		const cartSubTotal = userCart.reduce((total, product) => {
			return total + product.price * product.CartItem.quantity;
		}, 0);

		const cartTotal = (cartSubTotal * 1.07).toFixed(2);

		const renderedCartItems = userCart.map(product =>
			product.get({ plain: true })
		);

		res.render('cart', { renderedCartItems, loggedIn: req.session.loggedIn, cartTotal });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

router.get('/checkout', async (req, res) => {
	res.render('checkout', { loggedIn: req.session.loggedIn });
});


router.get('/signup', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('signup');
});

// redirects a user to the login page if they are currently logged in and try to access the login page
router.get('/login', (req, res) => {
	if (req.session.loggedIn) {
		res.redirect('/');
		return;
	}
	res.render('login');
});

module.exports = router;
