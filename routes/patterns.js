const express = require('express')
const router = express.Router()
const pattern = require('../controllers/patternsController')
const upload = require('../controllers/uploadsController')
const auth = require('../middleware/auth')

router.post('/create/pattern' , auth.validateToken, upload.uploadFileArray,pattern.createPattern)
router.get('/show/patterns' ,auth.validateTokenPublic, pattern.getAllPatterns)
router.put('/update/patterns' ,auth.validateToken, upload.uploadFileArray , pattern.editPattern)
router.delete('/delete/pattern/:PatternImage' ,auth.validateToken, pattern.deletePatterns)
module.exports = router;