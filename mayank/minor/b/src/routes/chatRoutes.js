

//libraries
const express = require("express");

// middlewares
const { tokenValidation } = require("../middlewares/authMiddleware");
const chatMiddlwares = require("../middlewares/chatMiddleware");
const asyncWrapper = require("../utils/catchAsync");

// controllers
const chatController = require("../controllers/chatController");

const chat = express.Router();


chat.post("/", tokenValidation, (req, res) => {
    res.send("hi from initial route of query");
})


chat.post("/query", tokenValidation, chatMiddlwares.zodQuery, asyncWrapper(chatController.query));
chat.get("/fetch-all-chat", tokenValidation, asyncWrapper(chatController.fetch));


module.exports = chat;