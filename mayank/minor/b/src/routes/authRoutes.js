

//libraries
const express = require("express");


// rotues
const signin = require("./authRoutes/signRoute");
const register = require("./authRoutes/registerRoute");

const auth = express.Router();


auth.use("/email-register", register);
auth.use("/signin", signin);


module.exports = auth;