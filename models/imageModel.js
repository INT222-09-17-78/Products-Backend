module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('Images', {
        ImageName: {
            type: DataTypes.STRING(50),
            primaryKey: true,
            // autoIncrement: true,
            unique: true,
            allowNull: false

        },
        color: {
            type: DataTypes.STRING(50),
            allowNull: false,

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

    return Images
}