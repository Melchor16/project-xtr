const express = require("express");
const dotenv = require("dotenv");
const app = require("./app");
const sequelize = require("./database/database");
const modelRalations = require('./database/associations')

dotenv.config({ path: "./src/config.env" }); // env variables
modelRalations() // Define relations bt models in database
port = process.env.PORT || 3000;

// try database connection
sequelize.authenticate()
.then(console.log('Database connected successfully!')) 
.catch((err)=>console.log('Database connection error: ', err))

// START SERVER ////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// process.on('SIGINT', () => {
//   console.log('Cerrando servidor...');
//   process.exit();
// });

