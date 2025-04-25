const db = require('../config/db');
const bcrypt = require('bcrypt');

const User = {
  create: async (userData) => {
    const { username, password, full_name, email, role } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await db.execute(
      'INSERT INTO users (username, password, full_name, email, role) VALUES (?, ?, ?, ?, ?)',
      [username, hashedPassword, full_name, email, role || 'member']
    );
    
    return result.insertId;
  },
  
  findByUsername: async (username) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },
  
  findById: async (id) => {
    const [rows] = await db.execute('SELECT id, username, full_name, email, role, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  
  getAll: async () => {
    const [rows] = await db.execute('SELECT id, username, full_name, email, role, created_at FROM users');
    return rows;
  }
};

module.exports = User;