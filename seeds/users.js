const User = require('../models/User');

const userData = [
	{
		username: 'user1',
		email: 'test@test.com',
		password: 'test1234',
	},
	{
		username: 'admin',
		email: 'admin@gmail.com',
		password: 'admin',
	}
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
