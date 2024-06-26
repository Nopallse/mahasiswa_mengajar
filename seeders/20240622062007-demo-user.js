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
        username: 'mahasiswa1',
        email: 'mhs1@gmail.com',
        password:  await bcrypt.hash('mhs', 10),
        hp: '080812345678',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'mahasiswa2',
        email: 'mhs2@gmail.com',
        password:  await bcrypt.hash('mhs', 10),
        hp: '080812345678',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'mahasiswa3',
        email: 'mhs3@gmail.com',
        password:  await bcrypt.hash('mhs', 10),
        hp: '080812345678',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  }
};
