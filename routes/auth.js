var express = require('express');
var router = express.Router();
const { login,redirectIfAuthenticated,logout,daftar } = require('../middleware/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Masuk' });
});
router.get('/registrasi',redirectIfAuthenticated, function(req, res, next) {
    res.render('registrasi', { title: 'Daftar' });
});
router.post('/registrasi-proses',daftar, function(req, res) {
    res.redirect('login', { title: 'Daftar' });
});
router.post('/login', login);
router.post('/logout', logout);

router.get('/error', function(req, res, next) {
    res.render('error', { title: 'Transkrip Nilai' });
});



module.exports = router;
