const { permissions } = require('../../constants');
const { hashThePassword } = require('../../helper/auth');
const connection = require('../../utils/db')

const createStaff = async (req, res) => {
    const { name, phone = "", address = "", email, password } = req.body;
    console.log('admin data', { name, phone, address, email, password })

    let { arrayOfPermissions } = req.body;
    arrayOfPermissions = JSON.stringify(arrayOfPermissions)
    const ip = req.ip;
    const created_on = Date.now()

    // type of admin is 2 for all the admin's execept super admin
    const type = 2
    try {

        if (!name) {
            return res.status(400).json({
                success: false,
                message: `please fill the name filed`,
            });
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: `please fill the email filed`,
            });
        }

        if (!password) {
            return res.status(400).json({
                success: false,
                message: `please fill the password filed`,
            });
        }



        const queryToCheckStaffInTheDatabase = `SELECT * FROM iwcntop_protect.admin WHERE email = ?;`

        // finding email id in the admin table to make sure that duplicate user will  not exists

        const promiseToFindAdmin = await new Promise((resolve, reject) => {
            connection.execute(queryToCheckStaffInTheDatabase, [email], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
        // returning false response if user exists in the database
        if (promiseToFindAdmin.length > 0) {

            return res.status(403).json({
                success: false,
                message: `staff with email ${email} already exists`,
            });
        }

        // query to insert staff in database

        const queryToInsertStaffInDatabase = `INSERT INTO iwcntop_protect.admin(name,email,password,permissions,phone,address,type,created_on, ip) VALUES(?,?,?,?,?,?,?,?,?);`

        // PROMISE TO INSERT STAFF
        const hashedPassword = await hashThePassword(password)
        const promiseToinsertStaff = await new Promise((resolve, reject) => {
            connection.execute(queryToInsertStaffInDatabase, [name, email, hashedPassword, arrayOfPermissions, phone, address, type, created_on, ip], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        // sending success response if everying goes well

        return res.status(200).json({
            success: true,
            message: `staff ${name} created successfully`,
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong`,
        });
    }
}


const get_all_staff = async (req, res) => {
    try {
        const queryToGetStaffList = `SELECT id,name,email,phone,address,permissions FROM iwcntop_protect.admin ;`

        connection.execute(queryToGetStaffList, (err, result) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: `something went wrong while getting staff list`,
                });
            } else {
                return res.status(200).json({
                    success: true,
                    message: `staff fetched successfully`,
                    staffList: result,
                });
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong`,
        });
    }
}

const deleteStaff = async (req, res) => {
    const { staffId } = req.params;
    console.log('this is staff id ', staffId)
    try {
        const queryToDeleteStaff = `DELETE FROM iwcntop_protect.admin WHERE id = ? ; `

        connection.execute(queryToDeleteStaff, [staffId], (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    message: `something went wrong`,
                });

            } else {
                return res.status(200).json({
                    success: true,
                    message: `staff deleted successfully`,

                });
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong`,
        });
    }
}


const updateStaff = async (req, res) => {
    const { name, email, password, address, phone } = req.body;
    let { permissions } = req.body;
    permissions = JSON.stringify(permissions)
    const { staffId } = req.params;
    const hashedPassword = password ? await hashThePassword(password) : null
    try {
        const queryToFindAdminWithStaffId = `SELECT name , email FROM iwcntop_protect.admin WHERE id = ? ;`

        // PROMISE TO FIND USER WITH STAFF ID WHICH WE ARE RECEVING IN PARAMS

        const adminUser = await new Promise((resolve, reject) => {
            connection.execute(queryToFindAdminWithStaffId, [staffId], (err, result) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })

        if (adminUser.length > 0) {
            // query to update admin in database
            const fieldsToUpdate = [
                name ? `name = "${name}" ` : null,
                phone ? `phone =${phone} ` : null,
                address ? `address = "${address}"` : null,
                email ? `email = "${email}"` : null,
                password ? `password = "${hashedPassword}"` : null,
                permissions ? `permissions = '${permissions}'` : null
            ].filter(Boolean).join(', ');

            const queryToUpdateAdmin = `UPDATE iwcntop_protect.admin SET ${fieldsToUpdate} WHERE id = ${staffId} ;`;

            console.log('fileds that will be updated', fieldsToUpdate)

            // executing the query to update user 
            connection.execute(queryToUpdateAdmin, (err, result) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: false,
                        message: `Something went wrong while updating admin`,
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: `Admin Successfully updated`,
                    });
                }
            })
        } else {
            return res.status(404).json({
                success: false,
                message: `No Admin Found With Provided Info`,
            });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: `something went wrong`,
        });
    }
}


module.exports = {
    createStaff,
    get_all_staff,
    deleteStaff,
    updateStaff
}