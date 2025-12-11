
//library
const express = require("express");


// middlewares
const authMiddlewares = require("../../middlewares/authMiddleware");
const asyncWrapper = require("../../utils/catchAsync");


//controllers
const signControllers = require("../../controllers/signIn_Controller");



const signin = express();


signin.post("/", authMiddlewares.zodSign, asyncWrapper(signControllers.signin))


signin.post("/check-token", authMiddlewares.tokenValidation, signControllers.respondTokenExists)



module.exports = signin;
