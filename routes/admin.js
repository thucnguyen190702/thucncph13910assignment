var express = require('express');
var router = express.Router();

const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.midddleware');


router.get('/login', authMiddleware.NoLogin, adminController.getLogin);
router.post('/login', authMiddleware.NoLogin, adminController.getPostLogin);


router.get('/register', authMiddleware.NoLogin, adminController.getRegister);
router.post('/register', authMiddleware.NoLogin, adminController.postRegister);
router.get('/logout',  adminController.logout);
module.exports = router;