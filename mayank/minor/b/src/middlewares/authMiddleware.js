//db functions
const OTPServices = require("../services/OTPServices");

// utils
const { decodeToken } = require("../utils/jwt");
const { validateWithZod, handleZod } = require("../utils/validator");

// zodSchema
const signSchema = require("../validators/authValidation");


// token validation 
function tokenValidation(req, res, next) {  //need to use this middlware for every req after the user login

    const token = req.cookies.token; //will change for the cookie later
    if (!token) {
        throw {
            type: "Unauthorized",
            message: 'Authorization failed. No access token.',
            status: 401
        }
    }
    else {
        // decode and check is tokenValid
        const decodedToken = decodeToken(token);
        req.userId = decodedToken.userId;
        next();
    }
}

function zodSign(req, res, next) {

    const result = validateWithZod(signSchema, req.body);
    console.log(JSON.stringify(result));
    return handleZod(res, result, next);
}


async function checkOTP(req, res, next) {

    const otp = req.body.otp;
    if (!otp) {
        throw { type: 'NotFound', message: "OTP is empty", status: 404 }
    }
    const signUpToken = req.query.token;
    // get otp and token from the url and find the user in temp db
    const result = await OTPServices.findinOTPModel(signUpToken, otp); // if otp is wrong throw error which will be caught by global error middleware
    req.data = result;
    next();
}

module.exports = { tokenValidation, zodSign, checkOTP };