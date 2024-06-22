var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const pengajuan = require('../controllers/pengajuan');


router.get('/daftar-pengajuan', requireAuth, pengajuan.daftarPengajuan);
router.get('/lihat-pengajuan/:idKegiatan', requireAuth, pengajuan.lihatPengajuan);
router.post('/terima-pengajuan/:idKegiatan', requireAuth, pengajuan.terimaKegiatan);
router.post('/tolak-pengajuan/:idKegiatan', requireAuth, pengajuan.tolakKegiatan);

module.exports = router;