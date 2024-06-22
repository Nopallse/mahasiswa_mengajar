'use strict';
var bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'adminUser',
        email: 'admin@gmail.com',
        password: await bcrypt.hash('admin', 10),
        hp: '084567890',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'mahasiswaUser',
        email: 'mahasiswa@gmail.com',
        password:  await bcrypt.hash('mhs', 10),
        hp: '084567891',
        role: 'mahasiswa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'umumUser',
        email: 'umum@gmail.com',
        password:  await bcrypt.hash('umum', 10),
        hp: '084567892',
        role: 'umum',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
