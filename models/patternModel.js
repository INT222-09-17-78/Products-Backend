module.exports = (sequelize, DataTypes) => {
    const Patterns = sequelize.define('Patterns', {
        PatternImage: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            // autoIncrement: true,
            unique: true,
            allowNull: false,
            validate:{
                notEmpty: true
            }

        },
        color: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate:{
                notEmpty: true
            }
            

        },
        ProdID:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: 'Products',
            key: 'ProdID'
        },
        }


    }, {
        timestamps: false,

    },
    )

    return Patterns
}