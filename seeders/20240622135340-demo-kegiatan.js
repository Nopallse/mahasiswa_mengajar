'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Sample data for Kegiatan
    const kegiatans = [
      {
        judul: 'Kegiatan A',
        gambar: 'kegiatan_a.jpg',
        deskripsi: 'Deskripsi kegiatan A',
        npsn: '12345678',
        namaSekolah: 'Sekolah A',
        lokasi: 'Jakarta',
        kuotaRelawan: 20,
        mulai: new Date('2024-07-01'),
        selesai: new Date('2024-07-05'),
        status: 'menunggu',
        dokumen: 'dokumen_a.pdf',
        nikUmum: '123456789', // This should be an existing 'nik' from Umum table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        judul: 'Kegiatan B',
        gambar: 'kegiatan_b.jpg',
        deskripsi: 'Deskripsi kegiatan B',
        npsn: '87654321',
        namaSekolah: 'Sekolah B',
        lokasi: 'Surabaya',
        kuotaRelawan: 15,
        mulai: new Date('2024-08-01'),
        selesai: new Date('2024-08-10'),
        status: 'diterima',
        dokumen: 'dokumen_b.pdf',
        nikUmum: '987654321', // This should be an existing 'nik' from Umum table
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more kegiatans as needed
    ];

    // Insert kegiatans into database
    await queryInterface.bulkInsert('Kegiatans', kegiatans, {});

    // Additional commands if needed after bulkInsert
  },

  async down(queryInterface, Sequelize) {
    // Remove all rows from Kegiatans table
    await queryInterface.bulkDelete('Kegiatans', null, {});
  }
};
