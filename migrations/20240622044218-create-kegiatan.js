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
        type: Sequelize.INTEGER
      },
      namaSekolah: {
        type: Sequelize.STRING
      },
      kuotaRelawan: {
        type: Sequelize.INTEGER
      },
      deadLine: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      dokumen: {
        type: Sequelize.STRING
      },
      nikUmum: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING,
        references: {
          model: 'Umums',
          key: 'nik'
        }
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