const User = require('./User');
const Product = require('./Product');
const Cart = require('./Cart');
const Category = require('./Category');

Product.belongsTo(Category, {
    foreignKey: 'category_id',
});

Category.hasMany(Product, {
    foreignKey: 'category_id',
});

Cart.belongsTo(User, {
    foreignKey: 'user_id',
});

Cart.hasMany(Product, {
    foreignKey: 'product_id',
});

module.exports = { User, Product, Cart, Category };