const router = require('express').Router();
const { User, Cart, Product, CartItem } = require('../../models');
// const productController = require('../../controllers/productController');

// allows a user to sign up and creates a corresponding cart for the user
router.post('/', async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
		});
		await Cart.create({
			user_id: userData.id,
		});
		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/', async (req, res) => {
	try {
		const userData = await User.findAll({
			include: {
				model: Cart,
				include: {
					model: Product,
					through: CartItem,
				},
			},
		});
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// allows the user to login
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

		if (!userData) {
			res
				.status(400)
				.json({ message: 'User not found' });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
			return;
		}
		req.session.save(() => {
			req.session.loggedIn = true;
			req.session.user_id = userData.id;

			res
				.status(200)
				.json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// returns a user's data based on their id
router.get('/:userId', async (req, res) => {
	try {
		const userData = await User.findByPk(req.params.userId);

		if (!userData) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// Router to delete a user
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.destroy({
            where: {
                id: req.params.userId,
            },
        });
        res.status(200).json({ message: 'User deleted' });
    }
    catch (err) {
        res.status(400).json(err);
    }
});

// Router to update a user's data
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.update(
            {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            },
            {
                where: {
                    id: req.params.userId,
                },
            }
        );
        res.status(200).json({ message: 'User updated' });
    }
    catch (err) {
        res.status(400).json(err);
    }
});




router.get('/:username', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: {
				username: req.params.username,
			},
		});

		if (!userData) {
			return res.status(404).json({ error: 'User not found' });
		}
		res.status(200).json(userData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// return's a user's cart information based on their id
router.get('/:userId/cart', async (req, res) => {
	try {
		const user = await User.findByPk(req.params.userId, {
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
		res.status(200).json(user.cart);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// adds a product to a user's cart
router.post('/cart/addItem/:productId', async (req, res) => {
	try {
		const user = await User.findByPk(req.session.user_id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const cart = await user.getCart();

		if (!cart) {
			return res.status(404).json({ error: 'Cart not found' });
		}

		const product = await Product.findByPk(req.params.productId);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		const cartItem = await CartItem.findOne({
			where: {
				cart_id: cart.id,
				product_id: product.id,
			},
		});

		if (cartItem) {
			await cartItem.increment('quantity');
		} else {
			await cart.addProduct(product, { through: { quantity: 1 } });
		}

		res.status(200).json({ message: 'Product added to cart' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// removes a product from a user's cart
router.delete('/cart/removeItem/:productId', async (req, res) => {
	try {
		const user = await User.findByPk(req.session.user_id);

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		const cart = await user.getCart();

		if (!cart) {
			return res.status(404).json({ error: 'Cart not found' });
		}

		const product = await Product.findByPk(req.params.productId);

		if (!product) {
			return res.status(404).json({ error: 'Product not found' });
		}

		await cart.removeProduct(product);

		res.status(200).json({ message: 'Product removed from cart' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// allows a user to logout
router.post('/logout', (req, res) => {
	if (req.session.loggedIn) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

module.exports = router;
