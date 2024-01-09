const { jwtSecreteKey } = require('../config')
const connection = require('../utils/db')
const jwt = require('jsonwebtoken')
const verifyAdmin = async (req, res, next) => {
    const token = req.headers['authorization']

    console.log('this is admin token', token)
    try {

        let verified = jwt.verify(token, jwtSecreteKey);
        req.userId = verified.id
        console.log('admin authantication complete', verified)

        // query to find admin in database and will check with verified.id that this user is admin or not 

        const queryToFindAdminInDatabase = `SELECT * FROM iwcntop_protect.admin WHERE id = ${verified.id}`

        const findAdmin = await new Promise((resolve, reject) => {

            connection.execute(queryToFindAdminInDatabase, (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })

        console.log('this is admin from middlware', findAdmin)

        if (findAdmin.type === 1 || findAdmin.type === 2) {
            req.user = findAdmin;
            next()
        } else {
            return res.status(401).json({
                success: false,
                message: "unauthorized user"
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Something Weong Wrong Please relogin",
            err: error.message
        })
    }
}


module.exports = verifyAdmin;