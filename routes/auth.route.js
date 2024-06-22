var express = require('express');
var router = express.Router();
const authController = require('../controller/auth.controller.js');
const { isAuthenticated, isAuthorized} = require('../middleware/session.middleware')

router.get('/',isAuthenticated,isAuthorized)

router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;

