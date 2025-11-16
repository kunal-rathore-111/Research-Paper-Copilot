
// db functions
const userService = require("../services/userService");
const OTPServices = require("../services/OTPServices");

//utils
const otpAndTokenGenerator = require("../utils/otpAndTokenGenerator");
const sendOtp = require("../utils/otpMailer");

//register
const signup = async (req, res) => {

    const signUpToken = otpAndTokenGenerator.generateSignUpToken();

    const otp = otpAndTokenGenerator.generateOtp();

    await OTPServices.storeInOTPModel(req.body, signUpToken, otp)  // later change with cache

    await sendOtp(req.body.email, otp);

    res.json({ message: "OTP sent", redirectUrl: `${process.env.BACKEND_BASE_Url}/auth/email-register/otp-verification?token=${signUpToken}` });

}


//checkEmail 
const checkEmail = async (req, res) => {
    const result = await userService.findEmail(req.body);
    if (!result) {
        return res.status(200).send("email not exists");// need to remove send with true false 
    }
    return res.status(400).send("email already exists");// need to remove send with true false 

}

// register

const register = async (req, res) => {

    await userService.storeUserByEmail(req.data); // if any db error throw it like userAlready Exists 
    res.json({ message: "Sign-up Successfull" }); // frontend need to redirect to /signin
}

module.exports = { signup, checkEmail, register }