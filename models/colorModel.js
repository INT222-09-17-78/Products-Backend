module.exports = (sequelize,DataTypes) => {
    const Colors = sequelize.define('Colors',{
        ColorID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true,
            allowNull: false

        },
        ColorName:{
            type: DataTypes.STRING,

        },
        
        
    }
        )
 
    return Colors
}