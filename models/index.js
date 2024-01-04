const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const CartItem = require('./CartItem');

User.hasOne(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Cart.belongsTo(User, {
    foreignKey: 'user_id'
});

Cart.belongsToMany(Product, {
    through: CartItem,
    foreignKey: 'cart_id'
});

Product.belongsToMany(Cart, {
    through: CartItem,
    foreignKey: 'product_id'
});

module.exports = { User, Product, Cart, CartItem };