const db = require('../models')
const Colors = db.colors
exports.createColor = (req,res) => {
    console.log(req.body)
    Colors.create({
        ColorName : req.body.ColorName
    }).then(data => res.json(data))
    Colors.addProducts
}



exports.getAllColors = (req,res) => {
    Colors.findAll({
        include: ["Products"]
    }).then(data => res.json(data))
}