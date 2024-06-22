var express = require('express');
var router = express.Router();
const umumController = require('../controller/umum.controller');
const { isAuthenticated, isAuthorized} = require('../middleware/session.middleware')

router.get('/',isAuthenticated,isAuthorized('admin'),umumController.getUmum);

module.exports = router;