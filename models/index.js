const { User, Product, Cart, Category } = require('./submodels');

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