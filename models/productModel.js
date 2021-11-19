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
        image:{
            type: DataTypes.STRING
        },
        Brands_BrandId:{
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