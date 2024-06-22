var express = require('express');
var router = express.Router();
const { getKegiatan , detailKegiatan,daftarKegiatan} = require('../controllers/KegiatanController');

/* GET home page. */

router.get('/', function(req, res, next) {
    res.redirect('/home', { title: 'Beranda' });
});
router.get('/tentang', function(req, res, next) {
    res.render('tentang' , { title: 'Tentang' });
});

router.get('/home', getKegiatan);

router.get('/kegiatan/:id', detailKegiatan);
router.get('/kegiatan/:id/lamar', daftarKegiatan);

module.exports = router;
