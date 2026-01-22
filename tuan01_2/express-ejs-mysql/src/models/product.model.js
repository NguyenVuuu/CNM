const db = require("../db/mysql.js");

class ProductModel {
  // Lấy tất cả sản phẩm
  static async findAll() {
    const [rows] = await db.query("SELECT * FROM products ORDER BY id DESC");
    return rows;
  }

  // Lấy sản phẩm theo ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM products WHERE id = ?", [id]);
    return rows[0];
  }

  // Tạo sản phẩm mới
  static async create(name, price, quantity) {
    const [result] = await db.query(
      "INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)",
      [name, price, quantity]
    );
    return result.insertId;
  }

  // Cập nhật sản phẩm
  static async update(id, name, price, quantity) {
    const [result] = await db.query(
      "UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?",
      [name, price, quantity, id]
    );
    return result.affectedRows;
  }

  // Xóa sản phẩm
  static async delete(id) {
    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    return result.affectedRows;
  }

  // Kiểm tra sản phẩm có tồn tại không
  static async exists(id) {
    const product = await this.findById(id);
    return !!product;
  }
}

module.exports = ProductModel;

