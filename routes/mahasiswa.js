var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');
const controller = require('../controller/ubahpass');

/* GET home page. */


router.get('/', requireAuth, function(req, res, next) {
  res.render('home', { title: 'Transkrip Nilai' });
});
router.get('/ubahpass', requireAuth, function(req, res, next) {
  res.render('ubahpass', { title: 'Transkrip Nilai' });
});
router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Transkrip Nilai', message: 'You need to log in to access this page' });
});

module.exports = router;
