var multer=require('multer')
var path=require('path')
//multer_config
module.exports = multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext=path.extname(file.originalname)
        if(ext!==".MP4"&&ext!==".MOV"&&ext!==".WMV"&&ext!==".FLV"){
            cb(new Error ('file type not support'),false)
            return
        }
        cb(null, true)
    }
})