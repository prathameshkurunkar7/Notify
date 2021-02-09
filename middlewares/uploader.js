const multer = require('multer');
const sharp = require('sharp');
const HttpError = require('../utils/httpError');

// handling images
const multerStorage = multer.memoryStorage();

const multerFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }else{
        cb(new HttpError('Not an valid MIMETYPE',400),false)
    }
};

const imageUpload = multer({
    limits:500000,
    storage:multerStorage,
    fileFilter: multerFilter
});

const resizeImage = (req,res,next) =>{
    if(!req.file) return next();
    req.file.fileName = `${req.file.fieldname}-${Date.now()}.jpeg`;
    req.file.path = `uploads/images/${req.file.fileName}`

    sharp(req.file.buffer).resize(500,500).toFormat('jpeg').jpeg({quality:95}).toFile(`uploads/images/${req.file.fileName}`)
    next();
}

exports.imageUpload = imageUpload.single('image');
exports.resizeImage = resizeImage;