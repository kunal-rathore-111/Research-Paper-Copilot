
const OTPModel = require("../models/otpModel");
const bcrypt = require("bcrypt");


async function storeInOTPModel(data, signUpToken, otp) {

    const { email, username, password } = data;
    const hashedPass = await bcrypt.hash(password, 10);

    return await OTPModel.create({
        signUpToken, email, username, password: hashedPass, otp
    });

    // if there any error it throws where the function is called (at register controller_signup)

}

async function findinOTPModel(signUpToken, otp) {

    const result = await OTPModel.findOne({ signUpToken, otp });
    if (!result) {
        throw {
            message: "Invalid OTP",
            type: "Unauthorized",
            status: 401,
        }
    }
    else { return result; }

}


module.exports = { storeInOTPModel, findinOTPModel }