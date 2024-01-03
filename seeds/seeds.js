const sequelize = require('../config/connection');
const seedProducts = require('./product');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedProducts();

    process.exit(0);
};

seedDatabase();