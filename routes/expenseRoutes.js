const { Router } = require("express");
const exp = Router({ mergeParams: true });
const {
  createExpense,
  findExpense,
  deleteExpense,
  getOneExpense,
} = require("./../Controller/expenseController");

exp
.get("/getall", findExpense)
.get("/:find_id", getOneExpense)
  .post("/", createExpense)
  .delete("/del/:delid", deleteExpense);

module.exports = exp;
