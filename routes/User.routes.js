const {Router}= require("express");
const userRoute= Router();
const {signUp, signIn}= require("./../Controller/User.controller");

userRoute.post("/",signUp).post("/signIn",signIn);

module.exports= userRoute;