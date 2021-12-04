module.exports = (sequelize,DataTypes) => {
    const Sizes = sequelize.define('Sizes',{
        SizeName : {
            type: DataTypes.STRING(30),
            primaryKey: true,
            // autoIncrement: true,
            unique: true,
            allowNull: false

        },
        Description:{
            type: DataTypes.STRING(45),
            allowNull: false,

        },
        
        
    }, {
        timestamps: false,

    },
        )
 
    return Sizes
}