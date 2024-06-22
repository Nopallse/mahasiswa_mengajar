var express = require('express');
var router = express.Router();
const mhsController = require('../controller/mhs.controller');
const { isAuthenticated, isAuthorized} = require('../middleware/session.middleware')

router.get('/',isAuthenticated,isAuthorized('admin'), mhsController.getMhs)

module.exports = router;