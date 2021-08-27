const db = require('../models')
const Products = db.products
exports.createProduct = (req,res) => {
    console.log(req.body)
    Products.create({
        ProdName : req.body.ProdName,
        Price: req.body.Price,
        Description: req.body.Description,
        ProduceDate: req.body.ProduceDate,
        BrandID: req.body.BrandID
    }).then(data => res.json(data))
    
}

exports.findProductById = (req,res) => {
    Products.findByPk(req.params.id, {include:["Brands"]}).then(data => {
        res.json(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving Product with id=" + req.params.id
        });
      });
}

exports.findProductByBrand = (req,res) => {
    Products.findAll({where: {BrandID: req.params.id}}).then(data => {
        res.json(data);
        console.log(data)
      })
      .catch(err => {
        res.status(500).json({
          message: "Error retrieving Product with brand=" + req.params.id
        });
      });
}

exports.getAllProducts = (req,res) => {
    Products.findAll({
        include: ["Brands"]
    }).then(data => res.json(data))
}
