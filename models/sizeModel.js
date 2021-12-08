module.exports = (sequelize,DataTypes) => {
    const Sizes = sequelize.define('Sizes',{
        SizeName : {
            type: DataTypes.STRING(30),
            primaryKey: true,
            // autoIncrement: true,
            unique: true,
            allowNull: false,
            validate:{
                notEmpty: true
            }

        },
        Description:{
            type: DataTypes.STRING(45),
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        
        
    }, {
        timestamps: false,

    },
        )
 
    return Sizes
}