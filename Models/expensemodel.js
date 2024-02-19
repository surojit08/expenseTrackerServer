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
  expenseTotal: {
    type: Number,
    require: true,
    default: 0,
  },
  itemList:[
    {
      item_name:{
        type: String,
        require: true,
      },
      amount:{
        type: Number,
        require: true,
        min:0,
        max:500000
      }
    }
  ],
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

const ExpenseModel= model("Expenses",ExpenseSchema);
module.exports= ExpenseModel;
