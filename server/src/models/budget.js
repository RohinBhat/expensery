const mongoose = require("mongoose");

const date = new Date();
const currentYear = date.getFullYear();

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    year: {
      type: Number,
      required: true,
      min: 2016,
      max: currentYear + 1,
    },
    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },
    budget: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Budget = new mongoose.model("Budget", budgetSchema);

module.exports = Budget;
