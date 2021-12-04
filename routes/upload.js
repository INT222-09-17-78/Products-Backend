const express = require('express')
const router = express.Router()
const upload = require('../controllers/uploadsController')
const auth = require('../middleware/auth')
// router.get('/show/images' ,upload.getFilesList)
router.get('/download/image/pattern/:name' ,auth.validateToken, upload.downloadPatternsFiles)
router.get('/download/image/:name' ,auth.validateToken, upload.downloadFiles)
module.exports = router;