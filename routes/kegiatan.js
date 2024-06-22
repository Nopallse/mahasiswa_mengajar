var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const admin = require('../controllers/KegiatanController');


router.get('/daftar-pengajuan', requireAuth, admin.daftarPengajuan);
router.get('/lihat-pengajuan/:idKegiatan', requireAuth, admin.lihatPengajuan);
router.post('/terima-pengajuan/:idKegiatan', requireAuth, admin.terimaKegiatan);
router.post('/tolak-pengajuan/:idKegiatan', requireAuth, admin.tolakKegiatan);

module.exports = router;