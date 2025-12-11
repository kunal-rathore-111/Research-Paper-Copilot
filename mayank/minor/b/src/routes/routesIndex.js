
// libs
const express = require("express");

// routes
const auth = require("./authRoutes");
const chat = require("./chatRoutes");
const exp = require("./exportRoutes");


const routes = express.Router();


routes.use("/auth", auth);  // # auth Routes
routes.use("/chat", chat); // # chat Routes
routes.use("/export", exp); // # export Routes


module.exports = routes;

