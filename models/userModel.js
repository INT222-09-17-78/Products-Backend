module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define('users',{
        username:{
            type: DataTypes.STRING,
            unique:true
        },
        email:{
            type: DataTypes.STRING,
            unique:true
        },
        password:{
            type: DataTypes.STRING
        },
        mobile:{
            type: DataTypes.STRING,
            unique:true
        }
        ,
        role:{
            type: DataTypes.STRING
        },
        image:{
            type: DataTypes.STRING
        }
        
    })
    return Users
}