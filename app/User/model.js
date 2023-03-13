const Sequelize = require('sequelize');
const db = require('../../db');

const { DataTypes } = Sequelize;

const User = db.define(
	'users',
	{
		name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		role: {
			type: DataTypes.ENUM,
			values: ['admin', 'member'],
			defaultValue: 'member',
		},
		isActive: {
			type: DataTypes.ENUM,
			values: ['pending', 'inactive', 'active'],
			defaultValue: 'pending',
		},
		foto: {
			type: DataTypes.STRING,
		},
		refreshToken: {
			type: DataTypes.TEXT,
		},
	},
	{
		freezeTableName: true,
	}
);

(async () => {
	await db.sync();
})();

module.exports = User;
