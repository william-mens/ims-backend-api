import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';


export default defineConfig({
  schema: './src/model',
  out: './drizzle',
  dialect: 'mysql',
  dbCredentials: {
    host: process.env.DB_HOST as string ,
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
  },
});