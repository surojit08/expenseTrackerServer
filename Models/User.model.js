const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  address: {
    type: String,
  },
});
const userModel = model("User", userSchema);
module.exports = { userModel };
