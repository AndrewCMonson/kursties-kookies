const User = require('../models/User');

const userData = [
    {
        username: 'user1',
        email: 'test@test.com',
        password: 'test1234'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;