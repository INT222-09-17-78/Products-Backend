module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('Images', {
        ImageName: {
            type: DataTypes.STRING,
            //   primarykey : true,
            //   unique: true,
            //   allowNull: false
        },
        Colors: {
            type: DataTypes.STRING,
        }
        

    }, { timestamps: false }
    )

    return Images
}