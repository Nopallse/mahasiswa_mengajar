'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kegiatans', {
      idKegiatan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      judul: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      npsn: {
        type: Sequelize.STRING
      },
      kuotaRelawan: {
        type: Sequelize.INTEGER
      },
      mulai: {
        type: Sequelize.DATE
      },
      selesai: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.ENUM('menunggu', 'diterima', 'ditolak'),
        defaultValue: 'menunggu',
      },
      dokumen: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Kegiatans');
  }
};
