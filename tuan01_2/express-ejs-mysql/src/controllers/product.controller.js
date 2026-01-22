const ProductModel = require("../models/product.model.js");

class ProductController {
  // Hiển thị danh sách sản phẩm
  static async index(req, res) {
    try {
      const products = await ProductModel.findAll();
      res.render("products", {
        products,
        user: {
          username: req.session.username,
          email: req.session.email,
        },
      });
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).send("Lỗi khi tải danh sách sản phẩm");
    }
  }

  // Thêm sản phẩm mới
  static async create(req, res) {
    try {
      const { name, price, quantity } = req.body;

      // Validation
      if (!name || !price || !quantity) {
        const products = await ProductModel.findAll();
        return res.render("products", {
          products,
          user: {
            username: req.session.username,
            email: req.session.email,
          },
          error: "Vui lòng điền đầy đủ thông tin",
        });
      }

      if (parseFloat(price) <= 0 || parseInt(quantity) < 0) {
        const products = await ProductModel.findAll();
        return res.render("products", {
          products,
          user: {
            username: req.session.username,
            email: req.session.email,
          },
          error: "Giá và số lượng phải là số hợp lệ",
        });
      }

      await ProductModel.create(name, price, quantity);
      res.redirect("/products");
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).send("Lỗi khi thêm sản phẩm");
    }
  }

  // Hiển thị form chỉnh sửa
  static async showEdit(req, res) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findById(id);

      if (!product) {
        return res.status(404).send("Không tìm thấy sản phẩm");
      }

      res.render("edit-product", {
        product,
        user: {
          username: req.session.username,
          email: req.session.email,
        },
        error: null,
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).send("Lỗi khi tải thông tin sản phẩm");
    }
  }

  // Cập nhật sản phẩm
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price, quantity } = req.body;

      // Validation
      if (!name || !price || !quantity) {
        const product = await ProductModel.findById(id);
        return res.render("edit-product", {
          product,
          user: {
            username: req.session.username,
            email: req.session.email,
          },
          error: "Vui lòng điền đầy đủ thông tin",
        });
      }

      if (parseFloat(price) <= 0 || parseInt(quantity) < 0) {
        const product = await ProductModel.findById(id);
        return res.render("edit-product", {
          product,
          user: {
            username: req.session.username,
            email: req.session.email,
          },
          error: "Giá và số lượng phải là số hợp lệ",
        });
      }

      const affectedRows = await ProductModel.update(id, name, price, quantity);

      if (affectedRows === 0) {
        return res.status(404).send("Không tìm thấy sản phẩm");
      }

      res.redirect("/products");
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).send("Lỗi khi cập nhật sản phẩm");
    }
  }

  // Xóa sản phẩm
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const affectedRows = await ProductModel.delete(id);

      if (affectedRows === 0) {
        return res.status(404).send("Không tìm thấy sản phẩm");
      }

      res.redirect("/products");
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).send("Lỗi khi xóa sản phẩm");
    }
  }
}

module.exports = ProductController;
