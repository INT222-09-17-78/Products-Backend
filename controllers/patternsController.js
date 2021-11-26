const db = require('../models')
const Pattern = db.patterns
const fs = require('fs/promises')
exports.createPattern = (req,res) => {
    // console.log(req.body)
    const patterns = req.body.patterns
    Pattern.bulkCreate(patterns).then(data => res.status(200).json(data)).catch(err =>{
        res.status(500).json({message:err.message})
        // if (req.file) {
        //     fs.unlink('./images/' + req.file.filename)
        //   }
    })
}

exports.getAllPatterns = (req,res) => {
    Pattern.findAll({
        include: ["Products"]
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({message : err.message})
    })
}

// exports.getPatternsByProd = (req,res) => {

// }