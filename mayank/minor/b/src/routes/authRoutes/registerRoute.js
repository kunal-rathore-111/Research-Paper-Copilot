
//library
const express = require("express");

// asyncWrapper
const asyncWrapper = require("../../utils/catchAsync");


// middlewares
const authMiddlewares = require("../../middlewares/authMiddleware");

//controllers
const registerControllers = require("../../controllers/registerController");

const app = express();

// /email-register
app.post("/", authMiddlewares.zodSign, asyncWrapper(registerControllers.signup));


// email checking debounce route
app.post("/check-email", asyncWrapper(registerControllers.checkEmail));

app.post("/otp-verification", authMiddlewares.checkOTP, asyncWrapper(registerControllers.register));

module.exports = app;