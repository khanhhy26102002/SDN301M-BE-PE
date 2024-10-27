const express = require("express");
const jwt = require("jsonwebtoken");
const login = require("../models/user");
const bcrypt = require("bcryptjs");
const secretkey = "SDN301M_PE_SU24_SE161252";
const router = express.Router();
router.post("/register", async (req, res) => {
  console.log("Register request received", req.body);
  const { username, password } = req.body;
  try {
    const existingAccount = await login.findOne({ username });
    if (existingAccount) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Mật khẩu mã hóa:", hashedPassword);
    const newAccount = new login({ username, password: hashedPassword });
    await newAccount.save();
    return res.status(201).json({ message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request received", req.body);
  try {
    const account = await login.findOne({ username });
    if (!account) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({ id: account._id }, secretkey, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login", error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
module.exports = router;