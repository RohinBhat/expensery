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
    res.status(500).send({ error });
  }
};

const updateCategoryController = async (req, res) => {
  const allowedUpdates = ["name", "color"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates",
    });
  } else {
    try {
      const category = await Category.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!category) {
        return res.status(404).send({
          error: "Category not found!",
        });
      }

      updates.forEach((update) => (category[update] = req.body[update]));
      await category.save();

      res.send(category);
    } catch (error) {
      res.status(500).send({ error });
    }
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

    res.send(category);
  } catch (error) {
    req.status(500).send({ error });
  }
};

module.exports = {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController,
};
