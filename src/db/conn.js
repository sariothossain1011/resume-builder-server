const mongoose = require('mongoose');
const dotenv = require("dotenv");  //require dotenv package
dotenv.config({ path: "./.env" }); //import config.env file

mongoose.connect(process.env.DATABASE , {useUnifiedTopology:true , useNewUrlParser:true,autoIndex:true})

const connection = mongoose.connection

connection.on('connected' , ()=>{
    console.log('MongoDB database connection successfully')
})
connection.on('error' , (error)=>{
    console.log('MongoDB database connection fail',error)
})