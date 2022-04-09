var fs = require('fs');
const ComicModel = require('../models/comic.model');
const multer = require("multer");
const comicMiddleware = require("../middleware/auth.midddleware");
var uploader = multer({dest:'./tmp/'});
//list
exports.getListComic = async (req, res, next) => {
    let listComics = await ComicModel.find();
    console.log(listComics);
    res.render('./comic/list', {listComics: listComics});
}
// exports.listComicMob = async (req,res,next)=>{
//     let listComicMob = await ComicModel.find();
//     res.json(listComicMob);
// }

//update
exports.getUpdateComic = async (req, res, next) => {
    console.log(req.params);
    let itemBook = await ComicModel.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    console.log(itemBook);
    if (itemBook == null) {
        res.send("Khong tim thay ban ghi");
    }
    res.render('./comic/update', {itemBook: itemBook});
}
exports.postUpdateComic = (req, res, next) => {
    console.log(req.body);
    let dieu_kien = {
        _id: req.params.id
    }
    console.log(dieu_kien);
    let data = {
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
        image: req.body.anhVip,
        content: req.body.content,

    }
    console.log(data);
    ComicModel.updateOne(dieu_kien, data, function (err, res) {
        if (err) {
            res.send('Update ERROR !' + err.message);
        }
    })
    // res.send('Abc');
    res.redirect('/comics/list');
}


//add
exports.getAddComic = (req, res, next) => {
    res.render('./comic/Add');
}
exports.postAddComic = (req, res, next) => {

    console.log(req.body);
    const objComic = new ComicModel({
        name: req.body.name,
        author: req.body.author,
        category: req.body.category,
        image: req.body.anhVip,
        content: req.body.content,

    });
    objComic.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Ghi du lieu thanh cong');
        }
    })
    // res.render('./comic/Add');
    res.redirect('/comics/list');
}




//delete
exports.getDeleteComic = async (req, res, next) => {
    console.log(req.params);
    let itemBook = await ComicModel.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    console.log(itemBook);
    if (itemBook == null) {
        res.send('Khong tim thay ban ghi');
    }
    res.render('comic/delete', {itemBook: itemBook});
}
exports.postDeleteComic = (req, res, next) => {
    let dieu_kien = {
        _id: req.params.id
    }
    ComicModel.deleteOne(dieu_kien, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Xóa thành công');
        }
    })
    res.redirect('/comics/list');
}
// exports.getPostImage = (req, res, next) => {
//     console.log(req.file, req.body);
//     fs.rename(req.file.destination + req.file.filename, './public/uploads' + req.file.originalname, function (err) {
//         if (err) {
//             console.log(err);
//         }
//     })
// }
