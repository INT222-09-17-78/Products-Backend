module.exports = (sequelize,DataTypes) => {
    const Brands = sequelize.define('Brands',{
        BrandId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false

        },
        BrandName:{
            type: DataTypes.STRING,

        },
        
        
    }, { timestamps: false }
        )
 
    return Brands
}