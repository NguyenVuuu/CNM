const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route hiển thị danh sách sản phẩm
router.get("/", productController.listProducts);

// Route hiển thị form thêm sản phẩm
router.get("/add", productController.showAddForm);

// Route xử lý thêm sản phẩm
router.post("/add", productController.createProduct);

// Route hiển thị form sửa sản phẩm
router.get("/edit/:id", productController.showEditForm);

// Route xử lý cập nhật sản phẩm
router.post("/edit/:id", productController.updateProduct);

// Route xử lý xóa sản phẩm
router.post("/delete/:id", productController.deleteProduct);

module.exports = router;
