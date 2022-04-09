const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://thucnguyen1907:thucnguyen1907@cluster0.2ho4b.mongodb.net/db_comic');
const comicSchema = new mongoose.Schema({
    name:'String',
    author: 'String',
    category: 'String',
    image: 'String',
    content: 'String',
    imagecontent:Array,
});

const Comic = mongoose.model('Comic', comicSchema);
// console.log('Connect db success')
module.exports = Comic;


// let listComic = [{
//     id: 1,
//     name: 'Lộng Gió',
//     author: 'Cửu U Diệp',
//     category: 'Kiếm Hiệp',
//     content: 'Loading....'
// },{
//     id: 2,
//     name: 'Tuy Rằng Người Đã Tẩy Trắng',
//     author: 'Yongyewuhua',
//     category: 'Kiếm Hiệp',
//     content: 'Loading....'
// },{
//     id: 3,
//     name: 'Thay Chị Lấy Chồng',
//     author: 'Mộc Tâm',
//     category: 'Ngôn Tình',
//     content: 'Loading....'
// }]
// 1
// function getListAllComic() {
//     return listComic;
// }

