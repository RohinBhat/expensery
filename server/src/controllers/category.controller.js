const Category = require("../models/category");

const createCategoryController = async (req, res) => {
  const category = new Category({
    user: req.user._id,
    ...req.body,
  });

  try {
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllCategoriesController = async (req, res) => {
  try {
    await req.user.populate({
      path: "categories",
    });
    res.send(req.user.categories);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteCategoryController = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category) {
      return res.status(404).send({
        error: "Category not found",
      });
    }
  } catch (error) {
    req.status(500).send({ error: error.message });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoriesController,
  deleteCategoryController,
};
