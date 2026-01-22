const UserModel = require("../models/user.model");

class UserController {
  // Hiển thị trang đăng ký
  static showRegister(req, res) {
    res.render("register", { error: null });
  }

  // Xử lý đăng ký
  static async register(req, res) {
    try {
      const { username, email, password, confirmPassword } = req.body;

      // Validation
      if (!username || !email || !password || !confirmPassword) {
        return res.render("register", {
          error: "Vui lòng điền đầy đủ thông tin",
        });
      }

      if (password !== confirmPassword) {
        return res.render("register", {
          error: "Mật khẩu xác nhận không khớp",
        });
      }

      if (password.length < 6) {
        return res.render("register", {
          error: "Mật khẩu phải có ít nhất 6 ký tự",
        });
      }

      // Kiểm tra email đã tồn tại
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.render("register", {
          error: "Email đã được sử dụng",
        });
      }

      // Kiểm tra username đã tồn tại
      const existingUsername = await UserModel.findByUsername(username);
      if (existingUsername) {
        return res.render("register", {
          error: "Tên đăng nhập đã được sử dụng",
        });
      }

      // Tạo user mới
      await UserModel.create(username, email, password);
      res.redirect("/auth/login");
    } catch (error) {
      console.error("Register error:", error);
      res.render("register", {
        error: "Đã xảy ra lỗi, vui lòng thử lại",
      });
    }
  }

  // Hiển thị trang đăng nhập
  static showLogin(req, res) {
    if (req.session.userId) {
      return res.redirect("/products");
    }
    res.render("login", { error: null });
  }

  // Xử lý đăng nhập
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validation
      if (!email || !password) {
        return res.render("login", {
          error: "Vui lòng điền đầy đủ thông tin",
        });
      }

      // Tìm user
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.render("login", {
          error: "Email hoặc mật khẩu không đúng",
        });
      }

      // Xác thực password
      const isValidPassword = await UserModel.verifyPassword(
        password,
        user.password
      );
      if (!isValidPassword) {
        return res.render("login", {
          error: "Email hoặc mật khẩu không đúng",
        });
      }

      // Lưu session
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.email = user.email;

      res.redirect("/products");
    } catch (error) {
      console.error("Login error:", error);
      res.render("login", {
        error: "Đã xảy ra lỗi, vui lòng thử lại",
      });
    }
  }

  // Đăng xuất
  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
      }
      res.redirect("/auth/login");
    });
  }
}

module.exports = UserController;

