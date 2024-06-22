var express = require('express');
var router = express.Router();
const umumController = require('../controller/umum.controlller');
const { isAuthenticated, isAuthorized} = require('../middleware/session.middleware')

router.get('/',isAuthenticated,isAuthorized('admin'),umumController.getUmum);