import db from './dbConnection.js';
import argon2 from 'argon2';
import { v4 } from 'uuid';

class User {
  constructor(
    id,
    email,
    password,
    created_at,
    updated_at,
    is_active,
    is_admin,
    session_uuid
  ) {
    this.id = id;

    this.email = email;
    this.password = password;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.is_active = is_active;
    this.is_admin = is_admin;
    this.session_uuid = session_uuid;
  }

  static async findById(id) {
    const row = await db.getrow('SELECT * FROM users WHERE id = ?', [id]);
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
      'INSERT INTO users (email, password, is_active, is_admin, session_uuid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [this.email, this.password, 1, 0, this.session_uuid]
    );
    this.id = result.insertId;
  }

  async update() {
    await db.update(
      'UPDATE users SET email=?, is_active=?, session_uuid=? WHERE id = ?',
      [this.email, this.is_active, this.session_uuid, this.id]
    );
  }
  async logout() {
    await db.update('UPDATE users SET session_uuid = ? WHERE id = ?', [
      v4(),
      this.id,
    ]);
  }

  async isPasswordValid(password) {
    return await argon2.verify(this.password, password);
  }

  async delete() {
    await db.query('DELETE FROM users WHERE id = ?', [this.id]);
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      created_at: this.created_at,
      updated_at: this.updated_at,
      is_active: this.is_active,
    };
  }
}

export default User;
