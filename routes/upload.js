const express = require('express')
const router = express.Router()
const upload = require('../controllers/uploadsController')
router.get('/show/images' ,upload.getFilesList)
router.get('/download/image/pattern/:name' , upload.downloadPatternsFiles)
router.get('/download/image/:name' , upload.downloadFiles)
module.exports = router;