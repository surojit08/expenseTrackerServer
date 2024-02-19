
const exp_route= require("./routes/expenseRoutes");
const express= require("express");
const cors= require("cors");
const {connect}= require("mongoose");
const user_route= require("./routes/User.routes");

// create a Http Server...
const server= express();

// Middleware/ Interceptor...
connect("mongodb://localhost:27017/expense");
server.use(cors());
server.use(express.json());

// 1st param path,2nd param Router.
// https://localhost:5005/expense
server.use("/expense",exp_route);
server.use("/users",user_route);

server.listen(5005);