import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

export const getDb = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });

  return drizzle(connection);
};
