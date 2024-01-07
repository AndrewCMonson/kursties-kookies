const sequelize = require('../config/connection');
const seedProducts = require('./product');
const seedUsers = require('./users');

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await seedProducts();

	await seedUsers();

	process.exit(0);
};

seedDatabase();
