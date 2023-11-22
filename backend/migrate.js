import db from './src/models/dbConnection.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const migrate = async () => {
  const migrations = await fs.readdir(path.join(__dirname, 'migrations'));

  for (const migration of migrations) {
    const fileContent = await fs.readFile(
      path.join(__dirname, 'migrations', migration),
      'utf-8'
    );
    await db.query(fileContent);
  }
};

migrate()
  .then(() => {
    console.log('Migration completed');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
