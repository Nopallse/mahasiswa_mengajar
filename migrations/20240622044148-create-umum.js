'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Umums', {
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nik: {
        allowNull: false,
        primaryKey: true,
        uniqe: true,
        type: Sequelize.STRING
      },
      nim: {
        allowNull: true,
        uniqe: true,
        type: Sequelize.STRING
      },
      nama: {
        type: Sequelize.STRING
      },
      tanggalLahir: {
        type: Sequelize.DATE
      },
      alamat: {
        type: Sequelize.STRING
      },
      cv: {
        allowNull: true,
        type: Sequelize.STRING
      },
      universitas: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Umums');
  }
};
