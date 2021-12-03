const express = require('express')
const router = express.Router()
const pattern = require('../controllers/patternsController')
const upload = require('../controllers/uploadsController')

router.post('/create/pattern', upload.uploadFileArray,pattern.createPattern)
router.get('/show/patterns' , pattern.getAllPatterns)
router.put('/update/patterns' , upload.uploadFileArray , pattern.editPattern)
router.delete('/delete/pattern' , pattern.deletePatterns)
module.exports = router;