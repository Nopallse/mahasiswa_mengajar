var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const pengajuan = require('../controllers/pengajuan');

/* GET home page. */

router.get('/dashboard', requireAuth, pengajuan.dashboard);
router.get('/dash', function(req, res, next) {
    res.render('dash' , { title: 'Dashboard Admin' });
});
router.get('/jadwal', function(req, res, next) {
    res.render('rekap_pengajuan' , { title: 'Status' });
});



module.exports = router;
