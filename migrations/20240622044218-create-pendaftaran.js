'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pendaftarans', {
      idPendaftaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idKegiatan: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Kegiatans',
          key: 'idKegiatan'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      nikUmum: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Umums',
          key: 'nik'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
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
    await queryInterface.dropTable('Pendaftarans');
  }
};
