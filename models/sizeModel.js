module.exports = (sequelize,DataTypes) => {
    const Sizes = sequelize.define('Sizes',{
        SizeName : {
            type: DataTypes.STRING,
            primaryKey: true,
            // autoIncrement: true,
            unique: true,
            allowNull: false

        },
        Description:{
            type: DataTypes.STRING,

        },
        
        
    }, {
        timestamps: false,

    },
        )
 
    return Sizes
}