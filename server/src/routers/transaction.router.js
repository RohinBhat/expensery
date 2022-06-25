const express = require("express");
const {
  createTransactionController,
  getAllTransactionsController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController,
} = require("../controllers/transaction.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createTransactionController);
router.get("/", auth, getAllTransactionsController);
router.get("/:id", auth, getTransactionController);
router.put("/:id", auth, updateTransactionController);
router.delete("/:id", auth, deleteTransactionController);

module.exports = router;
