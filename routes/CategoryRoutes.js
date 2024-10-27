const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { body, validationResult } = require("express-validator");
const category = require("../models/category");
const router = express.Router();
const validateCategory = [
  body("categoryName")
    .isString()
    .withMessage("Category name must be a string")
    .notEmpty()
    .withMessage("Category name is required"),
  body("categoryDescription")
    .isString()
    .optional()
    .withMessage("Category description must be a string"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
router.post("/", authMiddleware, validateCategory, async (req, res, next) => {
  const { categoryName, categoryDescription } = req.body;
  try {
    const newCategory = new category({ categoryName, categoryDescription });
    newCategory.save();
    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    const categories = await category.find();
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const categories = await category.findById(id);
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching category id", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  try {
    await category.findByIdAndUpdate(id, { categoryName });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category id", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})
module.exports = router;