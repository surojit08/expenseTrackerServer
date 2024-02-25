const {Router}= require("express");
const uploadRoute= Router();
const {UploadFile}= require("./../Controller/Upload.controller");


uploadRoute.post("/",UploadFile);

module.exports= uploadRoute;