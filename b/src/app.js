

// libraries
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// errorMiddleare
const errorHandler = require('./middlewares/errorMiddleware');

//routes
const routesIndex = require("./routes/routesIndex");

const app = express();
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use("/app/api", routesIndex);  //auth Route

app.get("/", (req, res) => { res.send("On Initial route /") });

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        mongooseState: require('mongoose').connection.readyState,
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        mongooseStateMap: {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting"
        }[require('mongoose').connection.readyState]
    });
});

app.use(errorHandler);

module.exports = app;