import { mysqlTable, json, varchar } from 'drizzle-orm/mysql-core';

export const productMeta = mysqlTable('product_meta', {
  productId: varchar('product_id', { length: 36 }).notNull(),
  meta: json('meta').notNull(),
});