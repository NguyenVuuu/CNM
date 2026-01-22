const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const { redirectIfAuthenticated } = require("../middlewares/auth.middleware");

// Trang đăng ký
router.get("/register", redirectIfAuthenticated, UserController.showRegister);
router.post("/register", redirectIfAuthenticated, UserController.register);

// Trang đăng nhập
router.get("/login", redirectIfAuthenticated, UserController.showLogin);
router.post("/login", redirectIfAuthenticated, UserController.login);

// Đăng xuất
router.get("/logout", UserController.logout);

module.exports = router;

