const argon2 = require('argon2')
const { jwtSecreteKey } = require('../config')
// hash the password with the help of this helper function
const jwt = require('jsonwebtoken');


const hashThePassword = async (rawPassword) => {
    try {
        const hashed = await argon2.hash(rawPassword);
        return hashed;
    } catch (error) {
        throw new Error('Something went wrong while hashing the password');
    }
}
const compareHashPassword = async (rawPassword, hashedPassword) => {

    try {
        const result = await argon2.verify(hashedPassword, rawPassword);
        console.log('Is password correct?', result);
        return result;
    } catch (error) {
        throw new Error('Something went wrong while verifying the password');
    }
}


// json web token (JWT) helpers 
const generateJWT = async (user) => {
    console.log('this is user obj', user);
    try {
        const payload = {
            id: user.id,
            email: user.email
        };

        const secret = jwtSecreteKey;
        const options = { expiresIn: '1h' };

        const token = jwt.sign(payload, secret);

        return token;
    } catch (error) {
        console.error(error);
        throw new Error(error)
    }
}
module.exports = {
    compareHashPassword,
    hashThePassword,
    generateJWT
}