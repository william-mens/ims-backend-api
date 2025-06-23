import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import {getDbCredentials} from './helpers/ssm'

let db: ReturnType<typeof drizzle> | null = null;
let connection: mysql.Connection | null = null;
let credentials: any = null;

export const getDb = async () => {
  if (db && connection) {
    try {
      await connection.ping();
      return db;
    } catch (error) {
      console.log('Connection lost, creating new one');
      db = null;
      connection = null;
    }
  }

  if (!credentials) {
    credentials = await getDbCredentials();
  }

  connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    database: credentials.database,
    password: credentials.password,
    connectTimeout: 10000,        
  });

  db = drizzle(connection);
  return db;
};

// Graceful cleanup function (call in Lambda handler if needed)
export const closeDb = async () => {
  if (connection) {
    try {
      await connection.end();
    } catch (error) {
      console.log('Error closing connection:', error);
    }
    connection = null;
    db = null;
  }
};