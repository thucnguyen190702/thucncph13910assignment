var comicModel = require('../models/comic.model');
exports.GetAll = async (req,res,next) =>{
    var listComic = await comicModel.find();
    res.json(listComic);
}

