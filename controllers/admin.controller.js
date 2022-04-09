var Admin = require('../models/admin.model');
var bcrypt = require('bcrypt');

exports.getLogin = (req, res, next) => {
    res.render('./admin/login',{currentAdmin: req.session.username});
}
exports.getPostLogin = async (req, res, next) => {
    console.log(req.body);
    const body = req.body;
    const user = await Admin.findOne({username: body.username});
    if (user) {
        console.log(user);
        //check password
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            console.log('Login Successfully');
            req.session.user = user;
            return res.redirect('/');
        } else {
            return res.status(400).json({error: "Sai pass"});
        }
    } else {
        return res.status(401).json({error: "Khong ton tai user"});
    }
    res.render('./admin/login');
}
exports.getRegister = (req, res, next) => {
    res.render('./admin/register');
}
exports.postRegister = async (req, res, next) => {
    console.log(req.body);
    console.log(req.body.password);
    if (req.body.password != req.body.repassword) {
        return res.render('./admin/register', {msg: 'Xac nhan pass sai', body: req.body});
    }
    //validate

    //tao ma pass
    //tao chuoi ma hoa de ket noi voi password, chuoi nay se thay doi ngau nhien
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    let objAdmin = new Admin({
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, salt),
        email: req.body.email,
    })
    //save to db
    objAdmin.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Save to db successfully');
        }
    });
    res.render('./admin/login', {msg: 'Dang ki thanh cong'});
    // var user = req.body;
    //
    // var errors = basevalidate.checkvalidate(req, user);
    // if (!errors){
    //     res.render('./admin/login', {msg: 'Dang ki thanh cong'});
    // }else {
    //     res.render("./admin/register", { errors: errors, user: user });
    // }

}
exports.logout = (req, res, next) => {
    req.session.destroy(function () {
        console.log("Đăng xuất thành công")
    });
    res.redirect('/admin/login');
}
