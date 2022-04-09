var express = require('express');
var router = express.Router();


const userController = require('../controllers/user.controller');
const userMiddleware = require('../middleware/auth.midddleware')

router.get('/list',userMiddleware.LoginRequire, userController.getListUser);

//add
router.get('/Add',userMiddleware.LoginRequire, userController.getAddUser);
router.post('/Add',userMiddleware.LoginRequire, userController.postAddUser);

//update
router.get('/update/:id',userMiddleware.LoginRequire, userController.getUpdateUser);
router.post('/update/:id',userMiddleware.LoginRequire,userController.postUpdateUser);

//delete
router.get('/delete/:id',userMiddleware.LoginRequire, userController.getDeleteUser);
router.post('/delete/:id',userMiddleware.LoginRequire,userController.postDeleteUser);
// router.delete('/delete/:id',userController.destroyUser);
module.exports = router;
