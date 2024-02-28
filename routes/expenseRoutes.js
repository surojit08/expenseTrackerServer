const { Router } = require("express");
const exp = Router({ mergeParams: true });
const {
  createExpense,
  findExpense,
  deleteExpense,
  getOneExpense,
  updateExpense,
} = require("./../Controller/expenseController");

exp
  .get("/getall", findExpense)
  .get("/:find_id", getOneExpense)
  .put("/:find_id", updateExpense)
  .post("/", createExpense)
  .delete("/del/:delid", deleteExpense);

module.exports = exp;
