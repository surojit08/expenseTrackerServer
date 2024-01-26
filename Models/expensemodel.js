const { Schema, model } = require("mongoose");

const ExpenseSchema = new Schema({
  balance: {
    type: Number,
    require: true,
    default: 0,
  },
  income: {
    type: Number,
    require: true,
    default: 0,
  },
  expense: {
    type: Number,
    require: true,
    default: 0,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["A", "D"],
    default: "A",
    require: true,
  },
});

const ExpenseModel= model("Rupees",ExpenseSchema);
module.exports= ExpenseModel;
