import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const batches = mysqlTable('batches', {
  id: varchar('id',{length:36}).primaryKey(),
  merchantId: varchar('merchant_id',{length:36}).notNull(),
  batchCode: varchar('batch_code', { length: 100 }),
  productId: varchar('product_id', { length: 36 }).notNull(),
  quantity: int('quantity').notNull(),
  createdBy: varchar('created_by', { length: 36 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});