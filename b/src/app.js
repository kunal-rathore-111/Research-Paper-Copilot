

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

app.get("/", (req, res) => { res.send("On Inital route /") })


app.use(errorHandler);

module.exports = app;