const express = require("express");
const {
  createBudgetController,
  getAllBudgetsController,
  getBudgetsByMonthController,
  getBudgetsByYearController,
  getBudgetsByIdController,
  updateBudgetByMonthController,
  updateBudgetByIdController,
  deleteBudgetByMonthController,
  deleteBudgetByIdController,
} = require("../controllers/budget.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createBudgetController);
router.get("/", auth, getAllBudgetsController);
router.get("/:year/:month", auth, getBudgetsByMonthController);
router.get("/:year", auth, getBudgetsByYearController);
router.get("/:id", auth, getBudgetsByIdController);
router.put("/:year/:month", auth, updateBudgetByMonthController);
router.put("/:id", auth, updateBudgetByIdController);
router.delete("/:year/:month", auth, deleteBudgetByMonthController);
router.delete("/:id", auth, deleteBudgetByIdController);

module.exports = router;
