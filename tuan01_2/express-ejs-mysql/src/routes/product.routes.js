const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const { requireAuth } = require("../middlewares/auth.middleware");

// Tất cả routes đều yêu cầu xác thực
router.use(requireAuth);

// Hiển thị danh sách sản phẩm
router.get("/", ProductController.index);

// Thêm sản phẩm mới
router.post("/add", ProductController.create);

// Hiển thị form chỉnh sửa
router.get("/edit/:id", ProductController.showEdit);

// Cập nhật sản phẩm
router.post("/edit/:id", ProductController.update);

// Xóa sản phẩm
router.post("/delete/:id", ProductController.delete);

module.exports = router;
