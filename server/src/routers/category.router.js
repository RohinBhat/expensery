const express = require("express");
const {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/category.controller");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, createCategoryController);
router.get("/", auth, getAllCategoriesController);
router.patch("/:id", auth, updateCategoryController);
router.delete("/:id", auth, deleteCategoryController);

module.exports = router;
