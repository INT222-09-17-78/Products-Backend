module.exports = (sequelize,DataTypes) => {
    const Brands = sequelize.define('Brands',{
        BrandID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false

        },
        BrandName:{
            type: DataTypes.STRING,

        },
        
        
    }
        )
 
    return Brands
}