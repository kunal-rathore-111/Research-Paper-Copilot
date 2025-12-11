

const mongoose = require("mongoose");

const OTP = new mongoose.Schema({
    signUpToken: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    otp: { type: String },
    expiresAt: {
        type: Date, default: () => { return new Date(Date.now() + 24 * 60 * 60 * 1000) },
        index: { expires: 0 }
    }
}, { timestamps: true });


const otpModel = mongoose.model("OTPModel", OTP);

module.exports = otpModel 