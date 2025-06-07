import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const productCategories = mysqlTable('product_categories', {
  categoryId: varchar('category_id',{length:36}),
  productId: varchar('product_id',{length:36}),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});