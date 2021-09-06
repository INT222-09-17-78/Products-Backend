module.exports = (sequelize,DataTypes) => {
    const Colors = sequelize.define('Colors',{
        ColorID : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true

        },
        ColorName:{
            type: DataTypes.STRING,

        },
        
        
    }
        )
 
    return Colors
}