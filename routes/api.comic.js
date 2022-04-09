var express = require('express');
var router = express.Router();
var apiC = require('../controllers/api.comic.controller');

router.get('/truyen/get-all',apiC.GetAll);


module.exports = router;