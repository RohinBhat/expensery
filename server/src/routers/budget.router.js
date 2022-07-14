const express = require("express");
const {
  createBudgetController,
  getAllBudgetsController,
  getBudgetsByMonthController,
  getBudgetsByYearController,
  getBudgetsByIdController,
  updateBudgetByIdController,
  deleteBudgetController,
} = require("../controllers/budget.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createBudgetController);
router.get("/", auth, getAllBudgetsController);
router.get("/month/:year/:month", auth, getBudgetsByMonthController);
router.get("/year/:year", auth, getBudgetsByYearController);
router.get("/:id", auth, getBudgetsByIdController);
router.patch("/:id", auth, updateBudgetByIdController);
router.delete("/:id", auth, deleteBudgetController);

module.exports = router;
