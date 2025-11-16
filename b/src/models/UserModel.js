

const mongoose = require("mongoose");

const users = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, require: true },
    email: { type: String, unique: true, required: true },
    authBy: { type: String, enum: ["Google", "email"], required: true },
    avatarUrl: { type: String, default: null },

});


const usersModel = mongoose.model("usersModel", users);

module.exports = usersModel