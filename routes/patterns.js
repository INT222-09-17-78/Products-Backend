const express = require('express')
const router = express.Router()
const pattern = require('../controllers/patternsController')
const uplaod = require('../controllers/uploadsController')

router.post('/create/pattern', uplaod.uploadFileArray,pattern.createPattern)
router.get('/show/patterns' , pattern.getAllPatterns)

module.exports = router;