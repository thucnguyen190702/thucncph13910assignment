let UserModel = require('../models/user.model');
const e = require("express");
var bcrypt = require('bcrypt');
// const Handlebars = require('handlebars');
exports.getListUser = async (req, res, next) => {
    let listUser = await UserModel.find();
    res.render('./user/list', {listUser: listUser});
}

//GET /users/getadd
exports.getAddUser = (req, res, next) => {
    res.render('./user/Add');
}
exports.postAddUser = async (req, res, next) => {
    console.log(req.body);
    const salt = await bcrypt.genSalt(10);
    const objUser = new UserModel({
        username: req.body.fullname,
        password: await bcrypt.hash(req.body.password,salt),
        email: req.body.email,
    });
    objUser.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Ghi du lieu thanh cong');
        }
    });
    if (req.body.password != req.body.repassword) {
        res.render('./user/Add', {msg: 'Xac nhan pass sai', body: req.body});
        return;
    }else {
        res.redirect('/users/list');
    }

}
exports.getUpdateUser = async (req, res, next) => {
    console.log(req.params);
    let itemUser = await UserModel.findById(req.params.id).exec().catch(function (err) {
        console.log(err);
    });
    console.log(itemUser);
    if (itemUser == null) {
        res.send('Khong tim thay ban ghi');
    }
    res.render('./user/update', {itemUser: itemUser});
}
exports.postUpdateUser = async (req, res, next) => {
    const salt = await bcrypt.genSalt(10);
    console.log(req.body);
    let dieu_kien = {
        _id: req.params.id,
    }
    let data = {
        username: req.body.fullname,
        password: await bcrypt.hash(req.body.password,salt),
        email: req.body.email,
    }
    UserModel.updateOne(dieu_kien, data, function (err, res) {
        if (err) {
            res.send('Update Error !!', err.message);
        }
    })
    if (req.body.password != req.body.repassword) {
        res.render('./user/Add', {msg: 'Xac nhan pass sai', body: req.body});
        return;
    }else {
        res.redirect('/users/list');
    }
}
exports.getDeleteUser = async (req, res, next) => {
    console.log(req.params);
    let itemUser = await UserModel.findById(req.params.id).exec().catch(function (err){
        console.log(err);
    });
    console.log(itemUser);
    if (itemUser==null){
        res.send('Khong tim thay ban ghi');
    }
    res.render('user/delete',{itemUser:itemUser});
}
exports.postDeleteUser = (req,res,next)=>{
    let dieu_kien = {
        _id:req.params.id,
    }
    UserModel.deleteOne(dieu_kien,function (err){
        if (err){
            console.log(err);
        }else {
            console.log('Xoa thanh cong');
        }
    });
    res.redirect('/users/list');
}