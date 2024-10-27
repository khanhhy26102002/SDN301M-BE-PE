const mongoose = require("mongoose");
const express = require("express");
const app = express();
const category = require("./routes/CategoryRoutes");
const bodyParser = require("body-parser");
const user = require("./routes/LoginRoutes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/api/category", category);
app.use("/api", user);
const url = "mongodb://localhost:27017/SDN301M_PE_SU24_SE161252DB";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
connect.then((db) => {
  console.log("Connected correctly to server");
});
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})
