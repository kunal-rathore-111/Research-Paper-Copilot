

const mongoose = require("mongoose");

function connectDB() {
    console.log("DB connecting");
    mongoose.connect(process.env.MONGOO_DB_URL).then(() => {
        console.log("DB connected")
    }).catch(err => {
        console.log("ERROR IN connectDB- " + err)
    })
}

module.exports = { connectDB };