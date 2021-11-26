const express = require('express')
const router = express.Router()
const sizesController = require('../controllers/sizesController');

router.post('/create/size', sizesController.createSize)
router.get('/show/sizes' , sizesController.getAllSizes)
router.put('/update/size' , sizesController.editSize)
router.delete('/delete/size/:SizeName' , sizesController.deleteSize)


module.exports = router;