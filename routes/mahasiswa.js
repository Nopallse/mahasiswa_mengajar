var express = require('express');
var router = express.Router();
const { login, requireAuth } = require('../middleware/auth');

/* GET home page. */



router.get('/error', function(req, res, next) {
  res.render('error', { title: 'Transkrip Nilai', message: 'You need to log in to access this page' });
});

module.exports = router;
