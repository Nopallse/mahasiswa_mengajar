var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const admin = require('../controllers/KegiatanController');


router.get('/daftar-pengajuan', requireAuth, admin.daftarPengajuan);
router.post('/terima-kegiatan/:idKegiatan', requireAuth, admin.terimaKegiatan);
router.post('/tolak-kegiatan/:idKegiatan', requireAuth, admin.tolakKegiatan);

module.exports = router;