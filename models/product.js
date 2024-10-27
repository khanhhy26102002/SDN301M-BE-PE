const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const product = new Schema({
  productName: {
    type: String,
    required: true,
    unique: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  isFeature: {
    type: Boolean,
    default: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true
  },
}, {
  timestamps: true,
});
const productSchema = mongoose.model("Product", product);
module.exports = productSchema;