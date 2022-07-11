const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  year: {
    type: Number,
    required: true,
    min: 2016,
    max: Date.now().year + 1,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  budget: [
    {
      category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Category",
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Budget = new mongoose.model("Budget", budgetSchema);

module.exports = Budget;
