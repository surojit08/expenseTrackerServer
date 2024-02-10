const ExpenseModel = require("../Models/expensemodel");

const calBalAndExpense= (inc,exp_list)=>{
  let totalExpense= 0;
  for(let exp of exp_list){
    totalExpense+= exp.amount;
  }
  const balance = inc - totalExpense;
  return {totalExpense,balance};
}

const createExpense = async (req, res) => {
  const income_val = Number(req.body.income);
  const exp_list = req.body.exp_list.filter((item)=> item.item_name.length>0)
  const date = req.body.date;
  const {balance,totalExpense}= calBalAndExpense(income_val,exp_list);
  
  try {
    const newExpense = await ExpenseModel.create({
      income: income_val,
      expenseTotal: totalExpense,
      itemList:exp_list, 
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
const updateExpense = async (req, res) => {
  try {
    const findId = req.params.find_id;
    const income_val = Number(req.body.income);
    const exp_list = (req.body.exp_list);
    const date = req.body.date;
    const {balance,totalExpense}= calBalAndExpense(income_val,exp_list);

    const updated = await ExpenseModel.findOneAndUpdate(
      { _id: findId },
      {
        income: income_val,
        expenseTotal: totalExpense,
        itemList: exp_list,
        date: date,
        balance: balance,
      },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(404).json(error);
  }
};

module.exports = {
  createExpense,
  findExpense,
  deleteExpense,
  getOneExpense,
  updateExpense,
};
