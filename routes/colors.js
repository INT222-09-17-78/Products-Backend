const express = require('express')
const router = express.Router()
const colorsController = require('../controllers/colorsController');

router.post('/create/color', colorsController.createColor)
router.get('/show/colors' , colorsController.getAllColors)
module.exports = router;