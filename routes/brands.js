const express = require('express')
const auth = require('../middleware/auth')

const router = express.Router()
const brandsController = require('../controllers/brandsController')
router.post('/create/brand', auth.validateToken,auth.ValidateAdmin,brandsController.createBrand)
router.get('/show/brands',  auth.validateToken,brandsController.getAllBrands)
router.put('/update/brand' ,  auth.validateToken,auth.ValidateAdmin,brandsController.editBrand)
router.delete('/delete/brand/:BrandId' ,  auth.validateToken,auth.ValidateAdmin,brandsController.deleteBrand)
module.exports = router;