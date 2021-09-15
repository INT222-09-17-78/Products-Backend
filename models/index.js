require('dotenv').config()
const {Sequelize ,DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DIALECT,
    operatorsAliases: 0,
  
    pool: {
      max: parseInt(process.env.POOL_MAX) ,
      min: parseInt(process.env.POOL_MIN) ,
      acquire: process.env.POOL_ACCUIRE,
      idle:process.env.POOL_IDLE
    }
})

const db = {};

// db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize,DataTypes);
db.products = require("./productModel.js")(sequelize,DataTypes)
db.brands = require("./brandModel.js")(sequelize,DataTypes)
db.colors = require("./colorModel")(sequelize,DataTypes)
db.images = require("./imageModel")(sequelize,DataTypes)  

  db.brands.hasMany(db.products,{
      foreignKey:'BrandID',
      as: "Products"
  })

  db.products.belongsTo(db.brands,{
        foreignKey:'BrandID',
        as: "Brands"
    })

  db.products.belongsToMany(db.colors, {
      through: db.images,
      as: "Colors",
      foreignKey: "Product_ProdID",
    });

  db.colors.belongsToMany(db.products, {
      through: db.images,
      as: "Products",
      foreignKey: "Color_ColorID",
  });


module.exports = db;