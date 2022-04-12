var express = require('express');
var app=express()
var mongoose  = require('mongoose');
var dotenv=require('dotenv')
dotenv.config()

// connectdb
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}) 
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))

app.use(express.json())
app.use('/user',require('./app/router/users'))//direct call route & route page

app.listen(3000,()=>console.log('server run successfully'))