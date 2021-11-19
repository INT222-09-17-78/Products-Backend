const express = require('express')
const router = express.Router()
const image = require('../controllers/imagesController')
const uplaod = require('../controllers/uploadsController')

router.post('/create/image', uplaod.uploadFile,image.createImage)
router.get('/show/images' , image.getAllImages)

module.exports = router;