var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin.controller.js');
const { isAuthenticated, isAuthorized} = require('../middleware/session.middleware')

router.get('/',isAuthenticated,isAuthorized('admin'), adminController.getAdmin);