var express = require('express');
var router = express.Router();
const { login,redirectIfAuthenticated,logout } = require('../middleware/auth');

/* GET home page. */
router.get('/',redirectIfAuthenticated, function(req, res, next) {
    res.render('login', { title: 'Transkrip Nilai' });
});
router.post('/login', login);
router.post('/logout', logout);

router.get('/error', function(req, res, next) {
    res.render('error', { title: 'Transkrip Nilai' });
});



module.exports = router;
