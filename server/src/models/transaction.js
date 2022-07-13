const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    transactionType: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    timestamp: {
      type: Date,
      required: true,
    },
    date: {
      type: Number,
      required: true,
      min: 1,
      max: 31,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: true,
      min: 2016,
      max: Date.now().year + 1,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
