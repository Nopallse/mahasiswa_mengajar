var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const pengajuan = require('../controllers/pengajuan');

/* GET home page. */

router.get('/dashboard', requireAuth, pengajuan.dashboard);

module.exports = router;
