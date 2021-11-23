const express = require('express')
const router = express.Router()
const pattern = require('../controllers/patternsController')
const uplaod = require('../controllers/uploadsController')

router.post('/create/image', uplaod.uploadFile,pattern.createPattern)
router.get('/show/images' , pattern.getAllPatterns)

module.exports = router;