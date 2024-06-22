const { Kegiatan } = require("../models");

const view = async (req, res) => {
  try {
    const events = await Kegiatan.findAll();
    res.render('mahasiswa/ajukankegiatan', { events , title: "ajukan Kegiatan"} );
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const add = (req, res) => {
  res.render('mahasiswa/tambahkegiatan', { title: "tambah Kegiatan"});
};

const store = async (req, res) => {
  try {
    const {
        judul, gambar, deskripsi, npsn, namaSekolah, kuotaRelawan, mulai, selesai, dokumen
      } = req.body;
  
      const nikUmum= 123456789;
      await Kegiatan.create({
        judul, gambar, deskripsi, npsn, namaSekolah, kuotaRelawan, mulai, selesai,  dokumen, nikUmum
      });
    res.redirect('/kegiatan');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Kegiatan.findByPk(id);

  
      if (event.status === 'diterima') {
        return res.status(403).send('Kegiatan dengan status "diterima" tidak dapat dihapus');
      }

    await Kegiatan.destroy({ where: { idKegiatan: id } });
    res.redirect('/kegiatan');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  view,
  add,
  store,
  delete: deleteEvent,
};
