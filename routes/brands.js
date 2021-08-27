const express = require('express')

const router = express.Router()
const brandsController = require('../controllers/brandsController')
router.post('/create/brand',brandsController.createBrand)
router.get('/show/brands', brandsController.getAllBrands)

module.exports = router;