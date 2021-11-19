const db = require('../models')
const Image = db.image
const fs = require('fs/promises')
exports.createImage = (req,res) => {
    // console.log(req.body)
    Image.create({
        ImageName : req.body.ImageName,
        color : req.body.color,
        ProdID: req.body.ProdID
    }).then(data => res.status(200).json(data)).catch(err =>{
        res.status(500).json({message:err.message})
        if (req.file) {
            fs.unlink('./images/' + req.file.filename)
          }
    })
}

exports.getAllImages = (req,res) => {
    Image.findAll({
        include: ["Products"]
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({message : err.message})
    })
}