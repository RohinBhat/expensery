const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: false,
  },
});

const Category = new mongoose.model("Category", categorySchema);

module.exports = Category;
