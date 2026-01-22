const express = require("express");
const session = require("express-session");
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

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key-change-this",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
    },
  }),
);

// Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// Redirect root to login
app.get("/", (req, res) => {
  if (req.session.userId) {
    res.redirect("/products");
  } else {
    res.redirect("/auth/login");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
