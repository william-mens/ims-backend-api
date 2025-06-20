import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import {getDbCredentials} from './helpers/ssm'
export const getDb = async () => {
 const creds = await getDbCredentials();
 
  const connection = await mysql.createConnection({
    host: creds.host,
    user: creds.user,
    database: creds.database,
    password: creds.password,
  });

  return drizzle(connection);
};
