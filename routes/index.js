var express = require('express');
var router = express.Router();
const { getKegiatan , detailKegiatan,daftarKegiatan} = require('../controllers/KegiatanController');
const { Kegiatan, Umum, Pendaftaran} = require('../models')

/* GET home page. */

router.get('/', getKegiatan);
router.get('/tentang', function(req, res, next) {
    res.render('tentang' , { title: 'Tentang' });
});

router.get('/kegiatan/:id', detailKegiatan);
router.get('/kegiatan/:id/lamar', daftarKegiatan);

module.exports = router;
