const express = require('express')

const router = express.Router()
const brandsController = require('../controllers/brandsController')
router.post('/create/brand',brandsController.createBrand)
router.get('/show/brands', brandsController.getAllBrands)
router.put('/update/brands' , brandsController.editBrand)
router.delete('/delete/brands' , brandsController.deleteBrand)
module.exports = router;