
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel=require('./models/Users')
const router = require('./Routes/Route')
const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/crud')

app.use(router)

app.listen(3001,()=>{
    console.log("Server is running")
})
