'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Sessions', {
            sid: {
                type: Sequelize.STRING,
                primaryKey: true,
                allowNull: false
            },
            expires: {
                type: Sequelize.DATE,
                allowNull: false
            },
            data: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: {
                type: Sequelize.DATE,
                llowNull: false
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Sessions');
    }
};