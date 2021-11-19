const express = require('express')
const router = express.Router()
const sizesController = require('../controllers/sizesController');

router.post('/create/size', sizesController.createSize)
router.get('/show/sizes' , sizesController.getAllSizes)
module.exports = router;