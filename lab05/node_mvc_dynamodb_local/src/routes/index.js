const express = require("express");
const router = express.Router();

// Route trang chủ
router.get("/", (req, res) => {
  res.redirect("/products");
});

module.exports = router;
