// Middleware kiểm tra xác thực
const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/auth/login");
  }
  next();
};

// Middleware chuyển hướng nếu đã đăng nhập
const redirectIfAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return res.redirect("/products");
  }
  next();
};

module.exports = {
  requireAuth,
  redirectIfAuthenticated,
};

