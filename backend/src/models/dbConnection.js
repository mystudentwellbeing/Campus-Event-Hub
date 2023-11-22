import Db from 'mysql2-async';
import dotenv from 'dotenv';

dotenv.config();

const configuration = {
  // user: 'root' ,
  // password: 'password',
  // database: 'mystudentwellbeing-db',
  // host: '127.0.0.1',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};

// if (process.env.DATABASE_SOCKET) {
//   configuration.socketPath = process.env.DATABASE_SOCKET;
// } else {
//   configuration.host = process.env.DATABASE_HOST;
// }

const db = new Db(configuration);

export default db;
