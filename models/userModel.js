const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER(10),
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING(45),
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args:[6, 25],
                    msg: 'Username should between 6 and 25 characters'
                },
                notNull: {
                    args: true,
                    msg: "username cannot be null"
                }
            }
        },
        email: {
            type: DataTypes.STRING(45),
            unique: true,
            validate: {
                isEmail: {
                    // args: true,
                    msg: 'Please input an email'
                }
            }
        },
        password: {
            type: DataTypes.STRING(90),
            allowNull: false,
            validate: {
                len: [8] ,
                notNull: {
                    args: true,
                    msg: "password cannot be null"
                }
            }
        },
        mobile: {
            type: DataTypes.STRING(10),
            unique: true,
            validate: {
                is:{ 
                    args: /^(0[689]{1})+([0-9]{8})+$/ ,
                    msg: 'Please input a mobile'}

            }
        },
        role: {
            type: DataTypes.STRING(45),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['Staff', 'Admin']],
                    msg: "Pleas input Admin or Staff only "
                  },
                notNull: {
                    args: true,
                    msg: "role cannot be null"
                }
                    
            }
        },
        // image: {
        //     type: DataTypes.STRING(50)
        // },


    }, {
        timestamps: false,

    }, )

    Users.addHook('beforeCreate', async (user) => {
        if (user.password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, salt);
        }
    });
    // Users.addHook('beforeUpdate', async (user) => {
    //     console.log()
    //     if (user.password && user.changed('password')) {
    //         const salt = await bcrypt.genSalt();
    //         user.password = await bcrypt.hash(user.password, salt);
    //     }
    // });
    return Users
}