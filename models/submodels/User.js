const { Model, Datatypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
	checkPassword(loginPW) {
		return bcrypt.compareSync(loginPW, this.password);
	}
}

// TODO create validation for unique username

User.init(
	{
		id: {
			type: Datatypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: Datatypes.STRING,
			allowNull: false,
		},
		email: {
			type: Datatypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: Datatypes.STRING,
			allowNull: false,
			validate: {
				len: [8],
			},
		},
		cart: {
			type: Datatypes.ARRAY,
			allowNull: true,
			references: {
				model: 'cart',
				key: 'id',
			},
		},
	},
	{
		hooks: {
			async beforeCreate(newUserData) {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			async beforeUpdate(updatedUserData) {
				updatedUserData.password = await bcrypt.hash(
					updatedUserData.password,
					10
				);
				return updatedUserData;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'user',
	}
);

module.exports = User;