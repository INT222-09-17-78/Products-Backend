module.exports = (sequelize,DataTypes) => {
    const Products = sequelize.define('Products',{
        ProdID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        ProdName:{
            type: DataTypes.STRING,

        },
        Price:{
            type: DataTypes.DOUBLE
        },
        Description:{
            type: DataTypes.STRING
        },
        ProduceDate:{
            type: DataTypes.DATE
        },
        BrandID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'Brands',
            key: 'BrandID'
        },
        }
        
        
    }
        )
       
    return Products
}