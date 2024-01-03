const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
	try {
		const userData = await User.create({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
		});
		res.status(200).json(userData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({
			where: {
				username: req.body.username,
			},
		});

		if (!userData) {
			res
				.status(400)
				.json({ message: 'Incorrect username or password, please try again' });
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res
				.status(400)
				.json({ message: 'Incorrect username or password, please try again' });
			return;
		}

		res.json({ user: userData, message: 'You are now logged in!' });
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
