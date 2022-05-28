const bcrypt = require('bcrypt');
const User = require("../models/user.model");
const Admin = require("../models/admin.model");
exports.getAllUser = async (req,res,next)=>{
    console.log(req.body);
    const body = req.body;
    const user = await Admin.findOne({email: body.email});
    if (user) {
        console.log(user);
        //check password
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            console.log('Login Successfully');
            // req.session.user = user;
            return res.redirect('/');
        } else {
            return res.status(400).json({error: "Sai pass"});
        }
    } else {
        return res.status(401).json({error: "Khong ton tai user"});
    }
    res.render('./admin/login');
    // var listUser = await User.find();
    // res.json(listUser);
}
//post register
exports.postReg = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const user = new User(req.body);
        console.log(req.body);
        user.password = await bcrypt.hash(req.body.password, salt);

        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}
//post login
exports.postLogin = async (req, res, next) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        console.log(user);
        if (!user) {
            return res.status(401).send({error: 'Login failed ! Check authentication credentials'})
        }
        const token = await user.generateAuthToken();
        res.status(200).send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}
//get profile
exports.getProfile = (req, res, next) => {
    res.send(req.user);
}
//post logout one device
exports.postLogOut = async (req, res, next) => {
    try {
        req.user = req.user.tokens.filter((token) => {
            return token.token != req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}

//post logout all device
exports.postLogOutAll = async (req, res, next) => {
    try {
        req.user.tokens.splice(0, user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
}