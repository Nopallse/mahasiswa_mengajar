var express = require('express');
var router = express.Router();
const authController = require('../controller/auth.controller.js');
const { isAuthenticated, isAuthorized} = require('../middleware/session.middleware')

router.get('/login', (req,res)=>{
    res.render('login')
});

module.exports = router;