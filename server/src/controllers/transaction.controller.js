const Transaction = require("../models/transaction");

const createTransactionController = async (req, res) => {
  const date = new Date(req.body.timestamp);

  const transaction = new Transaction({
    user: req.user._id,
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    ...req.body,
  });

  try {
    await transaction.save();
    res.status(201).send(transaction);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllTransactionsController = async (req, res) => {
  try {
    await req.user.populate({
      path: "transactions",
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
      },
    });
    res.send(req.user.transactions);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getTransactionByIdController = async (req, res) => {
  const _id = req.params.id;

  try {
    const transaction = await Transaction.findOne({ _id, user: req.user._id });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getTransactionsByCategoryController = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      category: req.params.category,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getTransactionsByYearController = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      year: req.params.year,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getTransactionsByMonthController = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      month: req.params.month,
      year: req.params.year,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getExpensesByYearController = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      year: req.params.year,
      transactionType: "debit",
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getExpensesByMonthController = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      month: req.params.month,
      year: req.params.year,
      transactionType: "debit",
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getIncomesByYearController = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      year: req.params.year,
      transactionType: "credit",
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const getIncomesByMonthController = async (req, res) => {
  try {
    const transaction = await Transaction.find({
      month: req.params.month,
      year: req.params.year,
      transactionType: "credit",
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

const updateTransactionController = async (req, res) => {
  const allowedUpdates = ["category", "amount", "transactionType"];
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
      const transaction = await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

      if (!transaction) {
        return res.status(404).send({
          error: "Transaction not found!",
        });
      }

      updates.forEach((update) => (transaction[update] = req.body[update]));
      await transaction.save();

      res.send(transaction);
    } catch (error) {
      res.status(500).send({ error });
    }
  }
};

const deleteTransactionController = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found!",
      });
    }

    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = {
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
};
