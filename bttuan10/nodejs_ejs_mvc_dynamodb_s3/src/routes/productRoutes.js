const express = require("express");
const router = express.Router();
const multer = require("multer");

const productController = require("../controllers/productController.js");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", productController.listProducts);

router.get("/add", productController.showAdd);

router.post("/add", upload.single("image"), productController.addProduct);

router.get("/edit/:id", productController.showEdit);

router.post("/edit", upload.single("image"), productController.updateProduct);

router.get("/delete/:id", productController.deleteProduct);

router.get("/search", productController.searchProduct);

module.exports = router;