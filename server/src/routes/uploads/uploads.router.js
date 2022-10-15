const express = require('express')
const multer = require('multer')
const path = require('path')
const { } = require('./uploads.controller')
const { protect, admin } = require('../../middleware/authMiddleware')

const uploadsRouter = express.Router();

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads/')
    },
    filename(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

function checkFileType(file, cb){
    const filetypes = /jpg|jpeg|png|/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if(extname && mimetype){
        return cb(null, true)
    }else{
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req,res,cb){
        checkFileType(file, cb)
    }
})

uploadsRouter.post('/', upload.single('image', (req,res)=>{
    res.send(`/${req.file.path}`)
}))

module.exports = { uploadsRouter };