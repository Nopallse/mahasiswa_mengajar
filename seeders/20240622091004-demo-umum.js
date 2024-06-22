'use strict';

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
    await queryInterface.bulkInsert('Umums', [
      {
        nik: '123456789',
        nama: 'John Doe',
        idUser: 2,
        tanggalLahir: new Date('1990-01-01'),
        alamat: 'Jl. Kebon Jeruk No. 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nik: '987654321',
        nim: 'B654321',
        nama: 'Jane Smith',
        idUser: 3,
        tanggalLahir: new Date('1992-02-02'),
        alamat: 'Jl. Mangga Dua No. 2',
        cv: 'jane_smith_cv.pdf',
        universitas: 'Universitas Andalas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Umums', null, {});
  }
};
