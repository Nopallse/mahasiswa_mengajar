'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Sample data for Pendaftaran
    const pendaftarans = [
      {
        idKegiatan: 1, // Make sure this ID exists in the Kegiatans table
        nikUmum: '987654321', // Make sure this NIK exists in the Umums table
        status: 'menunggu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKegiatan: 1, // Make sure this ID exists in the Kegiatans table
        nikUmum: '987654321', // Make sure this NIK exists in the Umums table
        status: 'menunggu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        idKegiatan: 2, // Make sure this ID exists in the Kegiatans table
        nikUmum: '987654321', // Make sure this NIK exists in the Umums table
        status: 'menunggu',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Insert pendaftarans into database
    await queryInterface.bulkInsert('Pendaftarans', pendaftarans, {});
  },

  async down (queryInterface, Sequelize) {
    // Remove all rows from Pendaftarans table
    await queryInterface.bulkDelete('Pendaftarans', null, {});
  }
};
