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
            validate:{
                notEmpty: true
            }

        },
        Price:{
            type: DataTypes.DOUBLE(8,2),
            allowNull: false,
        },
        Description:{
            type: DataTypes.STRING(500)
        },
        ProduceDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        Image:{
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate:{
                notEmpty: true
            }
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