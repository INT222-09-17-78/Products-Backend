const multer = require('multer')
const uuidv4 = require('uuid')
const path = require('path')
const util = require("util");
// const limit = 1048576000000000
const fileFilter = (req, file , cb) => {
    // if(file){
        
    //     cb(new Error('The file is empty!'), false)
    // }
    // else 
    if (file.mimetype.startsWith('image') ){     
        cb(null,true)
    }else{
        cb(new Error('The file is not image!'), false)
    }
}

const storage = multer.diskStorage({
    destination: (req , file ,cb) => {
        cb(null, './images/')
    },
    filename: (req, file, cb) => {
        
        // const ran = Math.random
        // cb(null,  uuidv4.v4()+'_user_images.' + path.extname(file.originalname) )
        cb(null,  file.originalname )
    }
})

let upload = multer({storage: storage, fileFilter: fileFilter,}).single('image')

let uploadArray = multer({storage: storage, fileFilter: fileFilter,limits: { fieldSize: 10485760 }}).array('images')
// let upload2 = multer({storage: storage, fileFilter: fileFilter})
// module.exports = upload2;
// module.exports = upload;
let uploadPromise = util.promisify(upload);
let uploadPromiseArray = util.promisify(uploadArray)
module.exports = {
    uploadPromise,
    uploadPromiseArray
    // upload2
}
// exports = upload