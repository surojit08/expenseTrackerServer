const ExpenseModel = require("../Models/expensemodel");

const createExpense = async (req, res) => {
  const income_val = Number(req.body.income);
  const expense = Number(req.body.expense);
  const date = req.body.date;
  const balance = income_val - expense;

  try {
    const newExpense = await ExpenseModel.create({
      income: income_val,
      expense: expense,
      balance: balance,
      date: date,
      status: "A",
    });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json(error);
  }
};

const findExpense = async (req, res) => {
  try {
    const allExpense = await ExpenseModel.find({ status: "A" });
    res.status(200).json(allExpense);
  } catch (error) {
    res.status(404).json(error);
  }
};

const deleteExpense = async (req, res) => {
  try {
    const del = req.params.delid;
    const delExp = await ExpenseModel.findOneAndUpdate(
      { _id: del, status: "A" },
      { status: "D" },
      { new: true }
    );
    res.status(201).json(delExp);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getOneExpense = async (req, res) => {
  try {
    const findId = req.params.find_id;
    const singleExpense = await ExpenseModel.findOne({
      _id: findId,
      status: "A",
    });
    // console.log(singleExpense);
    res.status(200).json(singleExpense);
  } catch (err) {
    res.status(404).json(err);
  }
};

module.exports = { createExpense, findExpense, deleteExpense, getOneExpense };
