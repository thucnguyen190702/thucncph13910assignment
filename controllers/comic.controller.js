var fs = require('fs');
const ComicModel = require('../models/comic.model');
const multer = require("multer");
const {resolve} = require("path");
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
exports.postAddPhoto = async (req, res, next) => {
    function removeVietnameseTones(str) {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "");
        str = str.replace(/\u02C6|\u0306|\u031B/g, "");
        str = str.trim();
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
        return str;
    }

    let condition = {_id: req.params.id};
    const comics = await ComicModel.findById(req.params.id).exec()
        .catch(err => {
            console.log(err);
        });
    if (comics == null) {
        return log("Comics not found");
    }
    console.log(req.files);
    const imageDirPath = resolve(__dirname, '../tmp');
    const files = fs.readdirSync(imageDirPath);
    const nameFolder = comics.name.replace(" ", '-');
    let newNameDir = removeVietnameseTones(nameFolder);
    var dir = './public/uploads/' + newNameDir;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        console.log("Create folder: " + dir);
    } else {
        console.log("Directory already exist");
    }
    let nameImages = [];
    let date = Date.now();
    await files.forEach((file, index) => {
        fs.renameSync(
            imageDirPath + `/${file}`,
            './public/uploads/' + newNameDir + '/' + date + "anh" + index + ".png",
            function (err) {
                if (err) {
                    console.log(err);
                }
            }
        )
    });
    const files_info = req.files;
    nameImages = files_info.map((file, index) => "/uploads/" + newNameDir + '/' + date + "anh" + index + ".png");
    req.session.listimg = nameImages;
    let comicObj = {
        name: comics.name,
        author:comics.author,
        category: comics.category,
        image: comics.image,
        imagecontent: nameImages,
    }
    ComicModel.updateOne(condition, comicObj, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Thanh cong");
        }
    });

    return res.redirect('/comics/list');

}
