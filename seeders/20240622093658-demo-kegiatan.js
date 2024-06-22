'use strict';

const { DATEONLY } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Kegiatans', [
      {
        idKegiatan: '1',
        judul: 'Mengajar Blud',
        gambar: 'sekolah.jpg',
        deskripsi: 'Mengajar di SDN 1 Demi Pembangunan',
        npsn: 51000789,
        kuotaRelawan: '7',
        mulai: new Date('2022-06-22'),
        selesai: new Date('2022-06-23'),
        status: 'menunggu',
        dokumen: 'mengajar_blud.pdf',
        nikUmum: '123456789',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    
  }
};
