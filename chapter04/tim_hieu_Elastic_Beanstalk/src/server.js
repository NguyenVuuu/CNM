const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

const studentRoutes = require("./routes/studentRoutes.js");
app.use("/", studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
