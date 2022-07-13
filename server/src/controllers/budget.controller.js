const { default: mongoose } = require("mongoose");
const Budget = require("../models/budget");

const createBudgetController = async (req, res) => {
  const existingBudget = await Budget.findOne({
    month: req.body.month,
    year: req.body.year,
    user: req.user._id,
  });

  if (existingBudget) {
    return res
      .status(400)
      .send({ error: "Budget for this month already exists" });
  }

  const budget = new Budget({
    user: req.user._id,
    ...req.body,
  });

  try {
    await budget.save();
    res.status(201).send(budget);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllBudgetsController = async (req, res) => {
  try {
    await req.user.populate({
      path: "budgets",
    });
    res.send(req.user.budgets);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getBudgetsByMonthController = async (req, res) => {
  const month = req.params.month;
  const year = req.params.year;

  const query = {
    month: month,
    year: year,
  };

  try {
    const budget = await Budget.findOne({ query, user: req.user._id });
    if (!budget) {
      return res.status(404).send({ error: "Budget not found!" });
    }

    res.send(budget);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getBudgetsByYearController = async (req, res) => {
  const year = req.params.year;

  const query = {
    year: year,
  };

  try {
    const budget = await Budget.find({ query, user: req.user._id });
    if (!budget) {
      return res.status(404).send({ error: "Budget not found!" });
    }

    res.send(budget);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getBudgetsByIdController = async (req, res) => {
  const _id = req.params.id;

  try {
    const budget = await Budget.find({ _id, user: req.user._id });
    if (!budget) {
      return res.status(404).send({ error: "Budget not found!" });
    }

    res.send(budget);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updateBudgetByMonthController = async (req, res) => {
  const allowedUpdates = ["budget"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  } else {
    try {
      const budget = await Budget.findOne({
        month: req.params.month,
        year: req.params.year,
        user: req.user._id,
      });

      if (!budget) {
        return res.status(404).send({
          error: "Budget not found!",
        });
      }

      updates.forEach((update) => (budget[update] = req.body[update]));
      await budget.save();

      res.send(budget);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
};

const updateBudgetByIdController = async (req, res) => {
  const allowedUpdates = ["budget"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  } else {
    try {
      const budget = await Budget.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!budget) {
        return res.status(404).send({
          error: "Budget not found!",
        });
      }

      updates.forEach((update) => (budget[update] = req.body[update]));
      await budget.save();

      res.send(budget);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
};

const deleteBudgetController = async (req, res) => {
  try {
    const budget = await Budget.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!budget) {
      return res.status(404).send({ error: "Budget not found!" });
    }

    res.send(budget);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
  createBudgetController,
  getAllBudgetsController,
  getBudgetsByMonthController,
  getBudgetsByYearController,
  getBudgetsByIdController,
  updateBudgetByIdController,
  updateBudgetByMonthController,
  deleteBudgetController,
};
