import db from './dbConnection.js';

class Institution {
  constructor(id, chat_name, creator_id, is_private, created_at, updated_at) {
    this.id = id;
    this.chat_name = chat_name;
    this.creator_id = creator_id;
    this.is_private = is_private;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  static async findById(id) {
    const row = await db.getrow('SELECT * FROM chats WHERE id = ?', [id]);
    if (row) {
      return new Chat(...Object.values(row));
    }
    return null;
  }

  static async findAll() {
    const rows = await db.query('SELECT * FROM chats');
    return rows.map((row) => new Chat(...Object.values(row)));
  }

  async save() {
    const result = await db.query(
      'INSERT INTO chats (chat_name, creator_id, is_private) VALUES (?, ?, ?)',
      [this.chat_name, this.creator_id, this.is_private]
    );
    this.id = result.insertId;
  }

  async update() {
    await db.update(
      'UPDATE chats SET chat_name = ?, creator_id = ?, is_private = ? WHERE id = ?',
      [this.chat_name, this.creator_id, this.is_private, this.id]
    );
  }

  async delete() {
    await db.query('DELETE FROM chats WHERE id = ?', [this.id]);
  }

  toJSON() {
    return {
      id: this.id,
      chat_name: this.chat_name,
      creator_id: this.creator_id,
      is_private: this.is_private,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}

export default Institution;
