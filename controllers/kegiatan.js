const { Kegiatan, Umum } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");


const makeUpload = "./uploads";

if (!fs.existsSync(makeUpload)) {
    fs.mkdirSync(makeUpload);
  }

const uploadDir = "uploads";
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "gambar") {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("Gambar harus berformat PNG atau JPG/JPEG"), false);
    }
  } else if (file.fieldname === "dokumen") {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Dokumen harus berformat PDF"), false);
    }
  } else {
    cb(new Error("Tipe file tidak diizinkan"), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB file size limit
});

// Simpan data kegiatan sementara
let temporaryKegiatanData = null;

// Controller functions
const view = async (req, res) => {
  try {
    const events = await Kegiatan.findAll();
    res.render('ajukankegiatan', { events, title: "Ajukan Kegiatan" });
  } catch (error) {
    console.error('Error in view function:', error);
    res.status(500).send(error.message);
  }
};



const store = async (req, res) => {
  try {
    upload.fields([
      { name: 'gambar', maxCount: 1 },
      { name: 'dokumen', maxCount: 1 }
    ])(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).send(err.message);
      } else if (err) {
        return res.status(500).send(err.message);
      }

      const {
        judul, deskripsi, npsn, namaSekolah, lokasi, kuotaRelawan, mulai, selesai
      } = req.body;

      // Retrieve file names (without full path)
      const gambarNama = req.files['gambar'] ? req.files['gambar'][0].filename : null;
      const dokumenNama = req.files['dokumen'] ? req.files['dokumen'][0].filename : null;

      console.log('Nama file gambar:', gambarNama);
      console.log('Nama file dokumen:', dokumenNama);

      const umum = await Umum.findOne({
        where:{
            idUser: req.session.userId
        }
      })
      // Simpan data kegiatan sementara
      temporaryKegiatanData = {
        judul,
        gambar: gambarNama,
        deskripsi,
        npsn,
        namaSekolah,
        lokasi,
        kuotaRelawan,
        mulai,
        selesai,
        dokumen: dokumenNama,
        nikUmum: umum.nik,
      };

      res.render('pembayaran', { 
        title: "Pembayaran Donasi",
        kegiatanData: temporaryKegiatanData
      });
    });
  } catch (error) {
    console.error('Error in store function:', error);
    res.status(500).send(error.message);
  }
};
// const pembayaran = (req, res) => {
//     res.render('mahasiswa/pembayaran', { title: "Tambah Kegiatan" });
//   };
const prosesPembayaran = async (req, res) => {
  try {
    const { jumlahDonasi } = req.body;

    if (jumlahDonasi < 50000) {
      return res.render('pembayaran', { 
        title: "Pembayaran Donasi",
        kegiatanData: temporaryKegiatanData,
        error: "Minimal donasi adalah Rp 50.000"
      });
    }

    // Simpan kegiatan ke database setelah pembayaran berhasil
    await Kegiatan.create(temporaryKegiatanData);

    // Bersihkan data kegiatan sementara
    temporaryKegiatanData = null;

    res.redirect('/ajukan-kegiatan');
  } catch (error) {
    console.error('Error in processPembayaran:', error);
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
    res.redirect('/ajukan-kegiatan');
  } catch (error) {
    console.error('Error in deleteEvent function:', error);
    res.status(500).send(error.message);
  }
};

const detail = async (req, res) => {
  try {
    const { id } = req.params;
    const kegiatan = await Kegiatan.findByPk(id);
    
    if (!kegiatan) {
      return res.status(404).send('Kegiatan tidak ditemukan');
    }
    
    res.render('detailajukankegiatan', { kegiatan, title: "Detail Kegiatan", moment });
  } catch (error) {
    console.error('Error in detailKegiatan function:', error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  view,

  store,
  deleteEvent,
  detail,
//   pembayaran ,// Tambahkan fungsi processPembayaran ke exports
  prosesPembayaran // Tambahkan fungsi processPembayaran ke exports
};
