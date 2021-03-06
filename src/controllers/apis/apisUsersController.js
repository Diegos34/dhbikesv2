
const db = require('../../../database/models');
const bcrypt = require('bcryptjs');

const apiUsersController = {
	list: async (req, res) => {
        
        const users = await db.User.findAll({
                attributes: ['email', 'name','last_name',]
            })
        
        res.json({
            meta: {
                status: "success", 
                count: users.length
            }, 
            data: {
                users,
            }
        })
        
    },

    login: async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        console.log('email: ' + email + ' Contraseña: ' + password);

        const user = await db.User.findOne({
            where: {
                email,
            }
        })

        if (user && bcrypt.compareSync(password, user.password)) {
            res.json({
                meta: {
                    status: 'success',
                },
                data: {
                    user
                }
            })
            return;
        } else {

        res.json({
            meta: {
                status: '400',
            }
            
        })
    }
    }, 

    checkEmail: async (req, res, next) => {
        const email = req.body.email;
        console.log(req.body.email);
        const user = await db.User.findOne({
            where: {
                email,
            }
        })

        if (!user) {
            res.json({
                meta: {
                    status: 'success',
                }
            })
            return;
        }

        res.json({
            meta: {
                status: 'Exist',
            }
            
        })

    } 
}

module.exports = apiUsersController;