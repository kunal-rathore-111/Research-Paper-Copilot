//lib
const bcrypt = require("bcrypt");

//files
const usersModel = require("../models/UserModel");

//function using in both time while signup for debounce and during checking email
async function isUserFoundFunction(email) {


    return await usersModel.findOne({ email: email });
}

// storeUser
async function storeUserByEmail(data) {
    const { username, password, email } = data;

    await usersModel.create({
        username: username,
        password: password,
        email: email,
        authBy: "email",
    });
}

// checkUser exists for login
async function isUserExists(data) {
    const { email, password } = data;
    const isUserFound = await isUserFoundFunction(email);

    if (isUserFound) {
        const checkPassword = await bcrypt.compare(password, isUserFound.password);
        if (!checkPassword) {
            throw {
                message: 'Incorrect Password',
                type: "Unauthorized",
                status: 401
            }
        }
        else {
            return isUserFound.id; // if user exists sends the _id as string for jwt token
        }
    }
    else {
        throw {
            message: 'User not found',
            type: "Unauthorized",
            status: 401
        }
    }
}


async function findEmail(data) {
    const email = data.email;
    return await isUserFoundFunction(email);
    // if there any error it directly throws where the function get called (at at  registercontroller_checkEmail)
}

module.exports = { storeUserByEmail, isUserExists, findEmail };