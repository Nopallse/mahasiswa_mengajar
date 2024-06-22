var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const kegiatanController = require('../controllers/kegiatan');
/* GET home page. */


router.get('/', requireAuth, function(req, res, next) {
  res.render('home', { title: 'Transkrip Nilai' });
});



router.get('/ajukan-kegiatan', requireAuth, kegiatanController.view);
router.get('/ajukan-kegiatan/add', requireAuth, (req, res) => {
  res.render('addkegiatan', { title: "Tambah Kegiatan" });
});
router.post('/ajukan-kegiatan/store', requireAuth,kegiatanController.store);
// router.post('/kegiatan/pembayaran', kegiatanController.pembayaran);
router.post('/ajukan-kegiatan/pembayaran/proses', requireAuth,kegiatanController.prosesPembayaran);
router.get('/ajukan-kegiatan/delete/:id', requireAuth,kegiatanController.deleteEvent);
router.get('/ajukan-kegiatan/detail/:id',requireAuth, kegiatanController.detail);



router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Transkrip Nilai', message: 'You need to log in to access this page' });
});


module.exports = router;
