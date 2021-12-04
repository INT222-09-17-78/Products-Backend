const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()
const brandsController = require('../controllers/brandsController')
router.post('/create/brand',brandsController.createBrand)
router.get('/show/brands', auth.validateToken, brandsController.getAllBrands)
router.put('/update/brand' , brandsController.editBrand)
router.delete('/delete/brand/:BrandId' , brandsController.deleteBrand)
module.exports = router;