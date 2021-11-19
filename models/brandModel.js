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
            type: DataTypes.STRING(45),
            allowNull: false,

        },
        
        
    }, { timestamps: false }
        )
 
    return Brands
}