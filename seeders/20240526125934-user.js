'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash('123', 10);
    return queryInterface.bulkInsert('Users', [
      {
        email: 'ilham@gmail.com',
        password: hashedPassword,
        role: 'mahasiswa',
        nama: 'ilham',
        nim_nip: '2211521019',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Sistem Informasi',
        alamat: 'jakarta',
        no_telp: '089601005498',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin', 10),
        role: 'admin',
        nama: 'Admin User',
        nim_nip: '987654321',
        fakultas: 'Fakultas Teknologi Informasi',
        jurusan: 'Informatika',
        alamat: null,
        no_telp: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
