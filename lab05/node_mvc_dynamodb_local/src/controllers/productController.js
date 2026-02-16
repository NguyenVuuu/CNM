const { v4: uuidv4 } = require("uuid");
const productModel = require("../models/productModel");

// Hiển thị danh sách sản phẩm
exports.listProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.render("products/list", {
      title: "Danh sách sản phẩm",
      products: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).render("error", {
      message: "Lỗi khi lấy danh sách sản phẩm",
      error: error,
    });
  }
};

// Hiển thị form thêm sản phẩm
exports.showAddForm = (req, res) => {
  res.render("products/add", {
    title: "Thêm sản phẩm mới",
  });
};

// Xử lý thêm sản phẩm
exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;

    const product = {
      productId: uuidv4(),
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      createdAt: new Date().toISOString(),
    };

    await productModel.createProduct(product);
    res.redirect("/products");
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).render("error", {
      message: "Lỗi khi tạo sản phẩm",
      error: error,
    });
  }
};

// Hiển thị form sửa sản phẩm
exports.showEditForm = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.getProductById(productId);

    if (!product) {
      return res.status(404).render("error", {
        message: "Không tìm thấy sản phẩm",
        error: { status: 404 },
      });
    }

    res.render("products/edit", {
      title: "Chỉnh sửa sản phẩm",
      product: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).render("error", {
      message: "Lỗi khi lấy thông tin sản phẩm",
      error: error,
    });
  }
};

// Xử lý cập nhật sản phẩm
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, price, quantity } = req.body;

    const productData = {
      name: name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    };

    await productModel.updateProduct(productId, productData);
    res.redirect("/products");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).render("error", {
      message: "Lỗi khi cập nhật sản phẩm",
      error: error,
    });
  }
};

// Xử lý xóa sản phẩm
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await productModel.deleteProduct(productId);
    res.redirect("/products");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).render("error", {
      message: "Lỗi khi xóa sản phẩm",
      error: error,
    });
  }
};
