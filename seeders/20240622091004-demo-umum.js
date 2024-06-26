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
        nik: '1111111',
        nama: 'Ilham Nofaldi',
        idUser: 2,
        tanggalLahir: new Date('2004-06-23'),
        alamat: 'Padang, Sumatera Barat',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nik: '2222222',
        nim: '2211522020',
        nama: 'Naufal',
        idUser: 3,
        tanggalLahir: new Date('2004-06-23'),
        alamat: 'Padang, Sumatera Barat',
        cv: 'naufal.pdf',
        universitas: 'Universitas Andalas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nik: '3333333',
        nim: '2211522036',
        nama: 'Mustafa Fathurrahman',
        idUser: 4,
        tanggalLahir: new Date('2004-06-23'),
        alamat: 'Padang, Sumatera Barat',
        cv: 'mustafa.pdf',
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
