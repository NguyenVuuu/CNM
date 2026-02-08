require("dotenv").config();
const express = require("express");
const path = require("path");
const productsRouter = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.redirect("/products");
});

app.use("/products", productsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(
    `📦 DynamoDB Table: ${process.env.DYNAMODB_TABLE_NAME || "Products"}`,
  );
  console.log(
    `🪣 S3 Bucket: ${process.env.S3_BUCKET_NAME || "products-img-lab03"}`,
  );
});
