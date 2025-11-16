


const mongoose = require("mongoose");
const usersModel = require("./UserModel");

const conversations = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: usersModel, required: true },
    query: { type: String, required: true },
    answer: { type: String, required: true }
}, { timestamps: true });


const conversationsModel = mongoose.model("Conversations", conversations);

module.exports = conversationsModel;