var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const admin = require('../controllers/KegiatanController');

/* GET home page. */


router.get('/dashboard', requireAuth, admin.dashboard);

module.exports = router;
