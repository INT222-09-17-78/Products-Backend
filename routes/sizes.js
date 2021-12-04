const express = require('express')
const router = express.Router()
const sizesController = require('../controllers/sizesController');
const auth = require('../middleware/auth')

router.post('/create/size', auth.validateToken,auth.ValidateAdmin, sizesController.createSize)
router.get('/show/sizes' , auth.validateToken, sizesController.getAllSizes)
router.put('/update/size' , auth.validateToken,auth.ValidateAdmin, sizesController.editSize)
router.delete('/delete/size/:SizeName' , auth.validateToken,auth.ValidateAdmin, sizesController.deleteSize)


module.exports = router;