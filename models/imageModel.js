module.exports = (sequelize,DataTypes) => {
    const Images = sequelize.define('Images',{
      ImageName: {
          type :DataTypes.STRING,
          primarykey : true}
        
    }, { timestamps: false }
        )
 
    return Images
}