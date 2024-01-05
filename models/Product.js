const { DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

const Product = sequelize.define('product', {
	id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
	product_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.DECIMAL(10, 2),
		allowNull: false,
		validate: {
			isDecimal: true,
		},
	},
	stock: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 10,
		validate: {
			isNumeric: true,
		},
	},
	filename: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	featured: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Product;