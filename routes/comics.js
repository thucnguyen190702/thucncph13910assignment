var multer = require('multer');
var express = require('express');
var router = express.Router();
const ComicModel = require('../models/comic.model');
const comicController = require('../controllers/comic.controller');
const comicMiddleware = require('../middleware/auth.midddleware');
//
router.get('/list', comicMiddleware.LoginRequire, comicController.getListComic);

//update

router.get('/update/:id', comicMiddleware.LoginRequire, comicController.getUpdateComic);
router.post('/update/:id', comicMiddleware.LoginRequire, comicController.postUpdateComic);
//add
router.get('/Add', comicMiddleware.LoginRequire, comicController.getAddComic);
router.post('/Add', comicMiddleware.LoginRequire, comicController.postAddComic);
// router.get('/getdataapi',comicController.listComicMob);
router.get('/delete/:id', comicMiddleware.LoginRequire, comicController.getDeleteComic);
router.post('/delete/:id', comicMiddleware.LoginRequire, comicController.postDeleteComic);

var multerupload = multer({dest: './tmp/'});
router.get('/addimage/:id', (req, res, next) => {
    res.render('./comic/addimage');
})
router.post('/addimage/:id', multerupload.array('anh', 10),comicController.postAddPhoto);
module.exports = router;


// enctype="multipart/form-data" khi thẻ form dùng multipart thì phải gắn với upload
// không qua upload nó hiểu toàn bộ là dữ liệu nhị phân,  nó cũng không nhận file luôn. ==> nó không nhận diện được

// giờ là e dùng cái upload không dùng post thường nữa vì trên form html dùng multipart,
//     post thường chỉ dùng cho form thường không có thuộc tính multipart.
