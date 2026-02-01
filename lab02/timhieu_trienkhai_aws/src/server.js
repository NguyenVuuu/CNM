const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const productRoutes = require("./routes/product.routes");

app.use("/products", productRoutes);

// Redirect root to products
app.get("/", (req, res) => {
  res.redirect("/products");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
