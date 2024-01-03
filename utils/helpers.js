module.exports = {
    check_stock: (stock) => {
        if (stock > 0) {
            return `In Stock`;
        } else {
            return `Out of Stock`;
        }
    },
};