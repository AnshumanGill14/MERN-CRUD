const mongoose=require("mongoose")

const loginSchema=mongoose.Schema({
    "email":String,
    "password":String
})

const LoginModel= mongoose.model("login",loginSchema)
module.exports=LoginModel