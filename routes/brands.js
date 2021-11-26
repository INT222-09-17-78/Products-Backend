const express = require('express')

const router = express.Router()
const brandsController = require('../controllers/brandsController')
router.post('/create/brand',brandsController.createBrand)
router.get('/show/brands', brandsController.getAllBrands)
router.put('/update/brand' , brandsController.editBrand)
router.delete('/delete/brand' , brandsController.deleteBrand)
module.exports = router;