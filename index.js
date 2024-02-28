const exp_route = require("./routes/expenseRoutes");
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { connect } = require("mongoose");
const user_route = require("./routes/User.routes");
const upload_route = require("./routes/Upload.routes");
const jwtToken = require("jsonwebtoken");
const { userModel } = require("./Models/User.model");

// create a Http Server...
const server = express();

// Middleware/ Interceptor...
connect("mongodb://localhost:27017/expense");
server.use(cors());
server.use(express.json());
server.use(fileUpload());

// writting an middleware that extract our token
// from the header and check if the token is valid or not
// 1. access the header
// 2. extract the token
// 3. validate the token.

const authMiddleware = async (req, res, next) => {
  // get the headers object from the request
  const headers = req.headers;
  // get the auth header from the headers object.
  const auth_header = headers.authorization;
  const [, token] = auth_header.split(" ");

  // now validate the token
  try {
    // try to verify, if it can not verify
    // then it throw error, then goto the catch block
    // else continue by calling next().
    const { email } = jwtToken.verify(token, "HiladuUp");
    // console.log(email);
    const user = await userModel.findOne({ email: email });
    const userInfo = {
      userId: user._id,
      userEmail: user.email,
    };
    req.userInfo = userInfo;

    // const x={a:100,b:200}
    // delete x.b;
    next();
  } catch (error) {
    // if the token is invalid then we res by 403
    res.status(403).json({ msg: "User not Authorised" });
  }
};


// 1st param path,2nd param Router.
// https://localhost:5005/expense
server.use("/users", user_route);
server.use(authMiddleware);
server.use("/expense", exp_route);
server.use("/uploads", upload_route);

server.listen(5005);
