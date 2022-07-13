const express = require("express");
const {
  createCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
} = require("../controllers/category.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createCategoryController);
router.get("/", auth, getAllCategoriesController);
router.delete("/:id", auth, deleteCategoryController);

module.exports = router;
