module.exports = (sequelize,DataTypes) => {
    const Images = sequelize.define('Images',{
      ImageName: {
          type :DataTypes.STRING}
        
    }, { timestamps: false }
        )
 
    return Images
}