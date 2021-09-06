const db = require('../models')
const Products = db.products
const Colors = db.colors
exports.createProduct = async  (req,res) => {
    console.log(req.body)
    var values = [];
    const images = [
      "ColorID","asdasd"
      
    
     
    ]
    try {
      const color = await Colors.findAll()
      console.log(color)
    const product = await Products.create({
        ProdName : req.body.ProdName,
        Price: req.body.Price,
        Description: req.body.Description,
        ProduceDate: req.body.ProduceDate,
        BrandID: req.body.BrandID
    })
    // for await (let x of color) {
    //   console.log(x.key)
      // data = await product.addColors(x.ColorID,{through: {ImageName:images[x]}})
    // }
    for (let i = 0; i < color.length; i++) {
      await product.addColors(color[i].ColorID,{through: {ImageName:images[i]}})
    }
    
    
    
    
    
    res.status(200).json(data)
    } catch (error) {
      if(!(!error.parent)){
      if((error.parent.code).includes('ER_NO_REFERENCED_ROW')){
        error.message = 'Maybe you your input brand or color does not exist'
      }}
      res.status(500).json({
        message: error.message || "Some error occurred while creating the Product."
      });
    }
    
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
