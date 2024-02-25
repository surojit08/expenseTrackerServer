const { userModel } = require("./../Models/User.model");
const { hashSync, compare } = require("bcrypt");
const jwtToken = require("jsonwebtoken");

const signUp = async (req, res) => {
  const uName = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const address = req.body.address;
  const hashedPassword = await hashSync(password, 10);
  try {
    const newUser = await userModel.create({
      userName: uName,
      email: email,
      password: hashedPassword,
      address: address,
    });
    res.status(201).send({ email: email });
  } catch (error) {
    res.status(404).json({ msg: "Cannot Create" });
  }
};
const signIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    //1. Check if the User exist by Email.
    //2. Get the Password from Db.
    //3. Compare password and given password from Db.
    const user = await userModel.findOne({ email: email });
    if (user === null || user === undefined) {
      throw new Error("User does not Exist");
    }
    const hashedPassword = user.password;
    const isPasswordMatched = await compare(password, hashedPassword);
    if (isPasswordMatched === false) {
      throw new Error("Password does not matched");
    }
    //Todo Generate JWT Token
    const token = await jwtToken.sign({ email: user.email }, "HiladuUp");
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { signUp, signIn };
