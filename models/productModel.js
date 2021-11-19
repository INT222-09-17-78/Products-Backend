module.exports = (sequelize,DataTypes) => {
    const Products = sequelize.define('Products',{
        ProdID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false

        },
        ProdName:{
            type: DataTypes.STRING(45),
            allowNull: false,

        },
        Price:{
            type: DataTypes.DOUBLE(8,2),
            allowNull: false,
        },
        Description:{
            type: DataTypes.STRING(300)
        },
        ProduceDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        BrandId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'Brands',
            key: 'BrandId'
        },
        }
        
        
    }, { timestamps: false }
        )
       
    return Products
}