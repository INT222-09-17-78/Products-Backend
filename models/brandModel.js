module.exports = (sequelize,DataTypes) => {
    const Brands = sequelize.define('Brands',{
        BrandID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        BrandName:{
            type: DataTypes.STRING,

        },
        
        
    }
        )
 
    return Brands
}