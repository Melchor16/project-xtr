const express = require('express')
const dotenv = require('dotenv')
const app = require('./app')

port = process.env.PORT

app.listen(3000, ()=>{
    console.log('App running on port 3000')
});