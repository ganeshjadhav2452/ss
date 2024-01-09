const { hashThePassword, compareHashPassword } = require('../../helper/auth');
const connection = require('../../utils/db')

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    console.log('this is admin user', req.user)
    const adminId = req.user.id;
    try {
        // query to get old password of admin 
        const queryToGetOldPasswordOfAdminUser = `SELECT id,email,password FROM iwcntop_protect.admin WHERE id = ?;`

        const promiseToGetOldPassword = await new Promise((resolve, reject) => {
            connection.execute(queryToGetOldPasswordOfAdminUser, [adminId], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result[0])
                }
            })
        })

        if (promiseToGetOldPassword) {
            console.log('this is user details we got from promise', promiseToGetOldPassword)

            const verified = await compareHashPassword(oldPassword, promiseToGetOldPassword.password)

            if (verified) {

                // if old password gets verified then we will hash the new password and store it in db

                const hashedPassword = await hashThePassword(newPassword)

                const queryToUpdatePassword = `UPDATE iwcntop_protect.admin SET password = ? WHERE id = ?;`

                connection.execute(queryToUpdatePassword, [hashedPassword, adminId], (err, result) => {
                    if (err) {
                        console.log(err)
                        return res.status(500).json({
                            success: false,
                            message: `something went wrong while updating password`,
                        });
                    } else {
                        return res.status(200).json({
                            success: true,
                            message: `password changed successfully`,
                        });
                    }
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong`,
        });
    }
}


const updateEmail = async (req, res) => {
    const { email } = req.body;
    const adminId = req.user.id

    try {
        const queryToUpdateEmail = `UPDATE iwcntop_protect.admin SET email = ? WHERE id = ?;`

        connection.execute(queryToUpdateEmail, [email, adminId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong while updating password`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `password changed successfully`,
                });
            }
        })
    } catch (error) {

    }
}
module.exports = {
    updatePassword,
    updateEmail
}
