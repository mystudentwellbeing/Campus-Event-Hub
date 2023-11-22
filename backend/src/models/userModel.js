import db from './dbConnection.js';
import argon2 from 'argon2';
import { v4 } from 'uuid';

class User {
  constructor(
    user_id,
    email,
    password,
    created_at,
    updated_at,
    is_active,
    is_admin,
    session_uuid
  ) {
    this.user_id = user_id;

    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.is_active = is_active;
    this.is_admin = is_admin;
    this.session_uuid = session_uuid;
  }

  static async findById(user_id) {
    const row = await db.getrow('SELECT * FROM users WHERE user_id = ?', [
      user_id,
    ]);
    if (row) {
      return new User(...Object.values(row));
    }
    return null;
  }

  static async findByEmail(email) {
    const row = await db.getrow('SELECT * FROM users WHERE email = ?', [email]);
    if (row) {
      return new User(...Object.values(row));
    }
    return null;
  }

  static async findAll() {
    const rows = await db.query('SELECT * FROM users');
    return rows.map((row) => new User(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      'INSERT INTO users (email, password, is_active, is_admin, session_uuid) VALUES (?, ?, ?, ?, ?)',
      [this.email, this.password, 1, 0, this.session_uuid]
    );
    this.user_id = result.insertId;
  }

  async update() {
    await db.update(
      'UPDATE users SET email=?, password=?, is_active=?, session_uuid=? WHERE user_id=?',
      [
        this.email,
        this.password,
        this.is_active,
        this.session_uuid,
        this.user_id,
      ]
    );
  }
  async logout() {
    await db.update('UPDATE users SET session_uuid=? WHERE user_id=?', [
      v4(),
      this.user_id,
    ]);
  }

  async isPasswordValid(password) {
    return await argon2.verify(this.password, password);
  }

  async delete() {
    await db.query('DELETE FROM users WHERE user_id = ?', [this.user_id]);
  }

  toJSON() {
    return {
      user_id: this.user_id,
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
      is_active: this.is_active,
    };
  }
}

export default User;
