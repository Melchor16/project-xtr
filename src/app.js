const express = require("express");
const morgan = require("morgan");
const songRouter = require("./routes/songRoutes");

const app = express();

//Middlewares
app.use(express.json());

//Routes
app.use("/api/v1/songs", songRouter);

module.exports = app;
