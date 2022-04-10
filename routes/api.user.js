var express = require('express');
var router = express.Router();
const auth = require('../middleware/api.auth.midleware')
var apiUser = require('../controllers/api.user.controller');

router.post('/user/reg',apiUser.postReg);

router.post('/user/login',apiUser.postLogin);

router.get('/user/profile',auth,apiUser.getProfile);

router.post('/user/logout',auth,apiUser.postLogOut);

router.post('/user/logout-all',auth,apiUser.postLogOutAll);
module.exports = router;