const { Router } = require("express");
const exp = Router();
const { createExpense,findExpense,deleteExpense }=require("./../Controller/expenseController");



exp.post("/",createExpense).get("/getall",findExpense).delete("/del/:delid",deleteExpense);


module.exports = exp;
 