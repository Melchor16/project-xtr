const express = require('express')
const dotenv = require('dotenv')
const Sequelize = require('sequelize')
const app = require('./app')

// env variables
dotenv.config()

console.log(process.env.DATABASE_USER, process.env.DATABASE_PASSWORD)

// connecting tu database------------------------------------------
const sequelize = new Sequelize(`postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@ep-proud-bird-a82c3e7m-pooler.eastus2.azure.neon.tech/xtrdb?sslmode=require`, {
    dialect: 'postgresql'
})
// sequelize.authenticate()
//   .then(() => {
//     console.log('Conexión exitosa a la base de datos');
//   }).catch((error) => {
//     console.error('No se pudo conectar a la base de datos:', error);
//   });
//------------------------------------------------------------------

port = process.env.PORT

app.listen(3000, ()=>{
    console.log('App running on port 3000')
});