const Transaction = require("../models/transaction");

const createTransactionController = async (req, res) => {
  const transaction = new Transaction({
    user: req.user._id,
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
    res.status(500).send({ error: error.message });
  }
};

const getTransactionController = async (req, res) => {
  const _id = req.params.id;

  try {
    const transaction = await Transaction.findOne({ _id, user: req.user._id });
    if (!transaction) {
      return res.status(404).send({
        error: "Transaction not found",
      });
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: error.message });
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
      error: "Invalid updates",
    });
  } else {
    try {
      const transaction = await Transaction.findOne({
        _id: req.params.id,
        author: req.user._id,
      });

      if (!transaction) {
        return res.status(404).send({
          error: "Transaction not found",
        });
      }

      updates.forEach((update) => (transaction[update] = req.body[update]));
      await transaction.save();

      res.send(transaction);
    } catch (error) {
      res.status(500).send({ error: error.message });
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
        error: "Transaction not found",
      });
    }

    res.send(transaction);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createTransactionController,
  getAllTransactionsController,
  getTransactionController,
  updateTransactionController,
  deleteTransactionController,
};
