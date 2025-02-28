const express = require("express");
const dotenv = require("dotenv");
const Sequelize = require("sequelize");
const app = require("./app");
const sequelize = require("./database/database");
const Song = require("./models/songModel");

// env variables
dotenv.config({ path: "./src/config.env" });

// START SERVER ////////////////////////////////////////////////////////////////////////////////////////
port = process.env.PORT;

(async () => {
  try {
    await sequelize.sync();

    app.listen(3000, () => {
      console.log("App running on port 3000");
    });
  } catch (err) {
    console.log(err);
  }
})();
