module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define('Users',{
        username:{
            type: DataTypes.STRING,
            unique:{
                args: true,
                msg: "asdsad"
            }
        },
        email:{
            type: DataTypes.STRING,
            unique:{
                args: true,
                // msg: "asdsad"
            }
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
        },
        
        
    }
        )
    return Users
}