'use strict';

const { TEXT } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
			},
			role: {
				type: Sequelize.ENUM,
				values: ['admin', 'member'],
				defaultValue: 'member',
			},
			isActive: {
				type: Sequelize.ENUM,
				values: ['pending', 'inactive', 'active'],
				defaultValue: 'pending',
			},
			foto: {
				type: Sequelize.STRING,
			},
			refreshToken: {
				type: Sequelize.TEXT,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Users');
	},
};
