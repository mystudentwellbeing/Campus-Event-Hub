import Db from 'mysql2-async';

const configuration = {
    // user: 'root' ,
    // password: 'password',
    // database: 'mystudentwellbeing-db',
    // host: '127.0.0.1',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port:3306
}
if (process.env.DATABASE_SOCKET) {
    configuration.socketPath = process.env.DATABASE_SOCKET
} else {
    configuration.host = process.env.DATABASE_HOST
}

const db = new Db(configuration);

export default db;