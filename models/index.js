const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');






Cart.belongsTo(User, {
    foreignKey: 'user_id',
});

Cart.hasMany(Product, {
    foreignKey: 'cart_item_id',
});

module.exports = { User, Product, Cart };