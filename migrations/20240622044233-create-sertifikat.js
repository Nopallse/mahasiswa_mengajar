'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sertifikats', {
      idSertifikat: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idPendaftaran: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pendaftarans',
          key: 'idPendaftaran'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      judul: {
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
    await queryInterface.dropTable('Sertifikats');
  }
};
