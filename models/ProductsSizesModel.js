module.exports = (sequelize, DataTypes) => {
    const ProductsSizes = sequelize.define('Products_Sizes', {
        // ImageName: {
        //     type: DataTypes.STRING,
        //     //   primarykey : true,
        //     //   unique: true,
        //     //   allowNull: false
        // },
        // Colors: {
        //     type: DataTypes.STRING,
        // }
        

    }, { timestamps: false }
    )

    return ProductsSizes
}