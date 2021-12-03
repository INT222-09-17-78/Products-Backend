const db = require('../models')
const Pattern = db.patterns
const fs = require('fs/promises')
exports.createPattern = (req, res) => {
    // console.log(req.body)
    const patterns = req.body.patterns
    // const patterns = JSON.parse(req.body.patterns)
    Pattern.bulkCreate(patterns, { validate: true }).then(data => res.status(200).json(data)).catch(err => {

        if (req.files) {
            //     fs.unlink('./images/' + req.file.filename)
            for (let i = 0; i < req.files.length; i++) {
                fs.unlink('./images/' + req.files[i].filename)
            }
        }
        res.status(500).json({ message: err.message })
    })
}

exports.editPattern = (req, res) => {
    // Pattern.update({},{
    //     where: {

    //     }
    // })
    const patterns = req.body.patterns


    // Pattern.findAll({
    //     where: {
    //         ProdID: req.body.patterns[0].ProdID
    //     }
    // }).then(patterns => {
        // if (req.files) {
        //     for (let i = 0; i < patterns.length; i++) {
                
        //         for (let j = 0; j < req.files.length; j++) {
        //             console.log(patterns[i].PatternName) 
        //             console.log(req.files[j].filename)
        //             if (patterns[i].PatternName != req.files[j].filename) {
        //                 // console.log(patterns[i].PatternName + " " + req.files[j].filename)
        //                 fs.unlink('./images/' + req.files[i].filename)
        //             }
        //         }
        //     }
        // }
        Pattern.bulkCreate(patterns, { updateOnDuplicate: ["Patternname", "color"], validate: true }).then(data => res.status(200).json(data)).catch(err => {

            console.log(req.files)
            if (req.files) {
                for (let i = 0; i < req.files.length; i++) {
                    // if (patterns[i].PatternName != req.files[i].filename) {
                    fs.unlink('./images/' + req.files[i].filename)
                    // }
                }
            }
            res.status(500).json({ message: err.message })
        })
    // }).catch(err => {
    //     if (req.files) {
    //         for (let i = 0; i < req.files.length; i++) {
    //             // if (patterns[i].PatternName != req.files[i].filename) {
    //             fs.unlink('./images/' + req.files[i].filename)
    //         }
    //         // }
    //     }
    //     res.status(500).json({ message: err.message })
    // })

}

exports.deletePatterns = async (req, res) => {
    // console.log(req.body.patterns)
    // const patterns = req.body.patterns
    try {
        if(!req.file){
            return res.status(500).json({message: "delete failed , don't have a file to delete"})
        }else{
            fs.unlink('./images/' + req.file.filename)
        }
      const deletedProdRow = await Products.destroy({
        where: {
            PatternName: req.body.PatternName
        }
      })
      if (deletedProdRow == 1) {
        res.status(200).json('deleted success')
      } else {
        res.status(500).json('maybe something wrong')
      }
  
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
}

exports.getAllPatterns = (req, res) => {
    Pattern.findAll({
        include: ["Products"]
    }).then(data => res.status(200).json(data)).catch(err => {
        res.status(500).json({ message: err.message })
    })
}

// exports.getPatternsByProd = (req,res) => {

// }