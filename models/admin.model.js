const mongoose = require('mongoose');
// var validator = require('express-validator');

mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.2ho4b.mongodb.net/db_comic');
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
}, {
    collection: 'account'
});

const Admin = mongoose.model('Admin', adminSchema);
// console.log('Connect db success')
module.exports = Admin;