import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const categories = mysqlTable('categories', {
  id: varchar('id',{length:36}).primaryKey(),
  merchantId: varchar('merchant_id',{length:36}).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),

});