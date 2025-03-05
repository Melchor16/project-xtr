const express = require("express");
const dotenv = require("dotenv");
const app = require("./app");
const sequelize = require("./database/database");
const modelRalations = require('./database/associations')

const testDatabase = require('./test')

// env variables
dotenv.config({ path: "./src/config.env" });
// Define relations bt models in database
//modelRalations()

// START SERVER ////////////////////////////////////////////////////////////////////////////////////////
port = process.env.PORT;

(async () => {
  try {
    //await sequelize.sync({force: true});
    testDatabase()

    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
})();

process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  process.exit();
});

