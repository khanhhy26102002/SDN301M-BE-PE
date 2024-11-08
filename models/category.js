const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const category = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  categoryDescription: {
    type: String,
    required: false,
  }
}, {
  timestamps: true,
});
const categorySchema = mongoose.model("Category", category);
module.exports = categorySchema;