const express = require('express')
const router = express.Router()
const upload = require('../controllers/uploadsController')
router.get('/show/uploads' ,upload.getFilesList)
router.get('/download/upload/:name' , upload.downloadFiles)
module.exports = router;