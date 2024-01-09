const { compareHashPassword, hashThePassword, generateJWT } = require("../../helper/auth");
const connection = require("../../utils/db");
const {
    getIpFromRequest,
    getFullDate,
    getTime,
} = require("../../helper/commonHelpers");
const { permissions } = require('../../constants')

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("this is body,", email, password);
    try {
        if (!email || !password) {
            return res.status(401).status({
                success: false,
                message: "Please provide neccessary inputes!",
            });
        }
        const queryToLogin = `SELECT * FROM iwcntop_protect.admin WHERE email = "${email}";`;
        // finding staff in database

        const findAdminPromise = await new Promise((resolve, reject) => {
            connection.execute(queryToLogin, (err, result) => {
                if (err) {
                    reject(err);
                } else if (result.length > 0) {
                    resolve(result[0]);
                } else {
                    reject('No User Found With This Mail')
                }
            });
        });

        // comparing the password with hash

        console.log('this is user we got', findAdminPromise)

        const isPasswordCorrect = await compareHashPassword(
            password,
            findAdminPromise.password
        );

        const adminData = findAdminPromise;
        delete adminData.password;

        // if compareHashPassword function returns false it means password does not matched with hashed
        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized User !",
            });
        }
        if (isPasswordCorrect) {
            // sending success response if we get true from verify function of bcrypt
            const token = await generateJWT(adminData)
            return res.status(200).json({
                success: true,
                message: "Access Granted",
                admin: { ...adminData },
                token
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "sorry something went wrong while processing your request",
        });
    }
};

const create_admin = async (req, res) => {
    const { name, email, password, phone, address, type } = req.body;

    try {
        // checking all inputes are filled or not
        if (!name || !email || !password || !phone || !address || !type) {
            return res.status(401).json({
                success: false,
                message: "Please provide all neccessary inputes!",
            });
        }

        console.log("executed step 1");
        // checking in database this user already exists in database or not

        const queryToFindUserInDatabase = `SELECT * FROM iwcntop_protect.admin WHERE email = "${email}";`;

        const findAdminPromise = await new Promise((resolve, reject) => {
            connection.execute(queryToFindUserInDatabase, (err, result) => {
                if (err) {
                    reject(err);
                } else if (result) {
                    resolve(result);
                } else {
                    console.log("fall in null");
                }
            });
        });

        console.log("executed step 2");

        // returning 403 already register response of user is already there in the database
        console.log("this is user found in db", findAdminPromise[0]);
        if (findAdminPromise[0]) {
            return res.status(403).json({
                success: false,
                message: "User Already Register Please Login",
            });
        }

        // getting ip of client

        const clientIp = getIpFromRequest(req);
        const date = getFullDate();
        const time = getTime();
        // hashing the password
        const hashedPassword = await hashThePassword(password);
        // query to insert admin in the database
        const queryToInsertUserInDatabaes = `INSERT INTO iwcntop_protect.admin(name,email,password,phone,address,type,ip,created_on,timestamp) VALUES(?,?,?,?,?,?,?,?,?);`;

        const values = [
            name,
            email,
            hashedPassword,
            phone,
            address,
            type,
            clientIp,
            date,
            time,
        ];

        console.log("executed step 3");
        const insertAdminPromise = await new Promise((resolve, reject) => {
            connection.execute(queryToInsertUserInDatabaes, values, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });

        console.log("user inserted success", insertAdminPromise);

        console.log("executed step 4");

        return res.status(200).json({
            success: true,
            message: "user created successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
};


const adminPermission = (req, res) => {
    try {

        // this is an simple controller to send permission data to the frontend
        res.status(200).json({
            success: true,
            message: 'permissions fetched',
            permissions, permissions
        })
    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
}
module.exports = {
    login,
    create_admin,
    adminPermission
};
