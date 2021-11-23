require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')
const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: process.env.DIALECT,
  operatorsAliases: 0,

  pool: {
    max: parseInt(process.env.POOL_MAX),
    min: parseInt(process.env.POOL_MIN),
    acquire: process.env.POOL_ACCUIRE,
    idle: process.env.POOL_IDLE
  }
})

const db = {};

// db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, DataTypes);
db.products = require("./productModel.js")(sequelize, DataTypes)
db.brands = require("./brandModel.js")(sequelize, DataTypes)
db.sizes = require("./sizeModel")(sequelize, DataTypes)
db.products_sizes = require("./ProductsSizesModel")(sequelize, DataTypes)
db.patterns = require("./patternModel")(sequelize, DataTypes)

db.brands.hasMany(db.products, {
  foreignKey: 'BrandId',
  as: "Products"
})

db.products.belongsTo(db.brands, {
  foreignKey: 'BrandId',
  as: "Brands"
})

db.products.hasMany(db.patterns, {
  foreignKey: 'ProdID',
  as: "Patterns"
})

db.patterns.belongsTo(db.products, {
  foreignKey: 'ProdID',
  as: "Products"
})

db.products.belongsToMany(db.sizes, {
  through: db.products_sizes,
  as: "Sizes",
  foreignKey: "Product_ProdID",
});

db.sizes.belongsToMany(db.products, {
  through: db.products_sizes,
  as: "Products",
  foreignKey: "Size_SizeName",
});


module.exports = db;