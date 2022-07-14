const express = require("express");
const {
  createTransactionController,
  getAllTransactionsController,
  getTransactionByIdController,
  getTransactionsByCategoryController,
  getTransactionsByYearController,
  getTransactionsByMonthController,
  getExpensesByYearController,
  getExpensesByMonthController,
  getIncomesByYearController,
  getIncomesByMonthController,
  updateTransactionController,
  deleteTransactionController,
} = require("../controllers/transaction.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createTransactionController);
router.get("/", auth, getAllTransactionsController);
router.get("/:id", auth, getTransactionByIdController);
router.get("/category/:category", auth, getTransactionsByCategoryController);
router.get("/year/:year", auth, getTransactionsByYearController);
router.get("/month/:year/:month", auth, getTransactionsByMonthController);
router.get("/expense/year/:year", auth, getExpensesByYearController);
router.get("/expense/month/:year/:month", auth, getExpensesByMonthController);
router.get("/income/year/:year", auth, getIncomesByYearController);
router.get("/income/month/:year/:month", auth, getIncomesByMonthController);
router.patch("/:id", auth, updateTransactionController);
router.delete("/:id", auth, deleteTransactionController);

module.exports = router;
