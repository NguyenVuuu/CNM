const db = require("../db/mysql.js");

class UserModel {
  // Tạo user mới
  static async create(username, email, password) {
    const [result] = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, password],
    );
    return result.insertId;
  }

  // Tìm user theo email
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  // Tìm user theo ID
  static async findById(id) {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  }

  // Tìm user theo username
  static async findByUsername(username) {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    return rows[0];
  }

  // Xác thực password (so sánh trực tiếp)
  static async verifyPassword(plainPassword, storedPassword) {
    return plainPassword === storedPassword;
  }

  // Lấy tất cả users
  static async findAll() {
    const [rows] = await db.query("SELECT id, username, email FROM users");
    return rows;
  }
}

module.exports = UserModel;
