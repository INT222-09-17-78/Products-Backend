const db = require('../models')
const Sizes = db.sizes
exports.createSize = (req,res) => {
    console.log(req.body)
    Sizes.create({
        SizeName : req.body.SizeName,
        Description : req.body.Description
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(200).json({message:err.message})
    })
    // Sizes.addProducts
}



exports.getAllSizes = (req,res) => {
    Sizes.findAll({
        include: ["Products"]
    }).then(data => res.json(data))
}