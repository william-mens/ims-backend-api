import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const inventory = mysqlTable('inventory', {
  id: varchar('id',{length:36}).primaryKey(),
  merchantId: varchar('merchant_id',{length:36}).notNull(),
  batchId: varchar('batch_id', { length: 36 }),
  stageId: varchar('stage_id', { length: 36 }).notNull(),
  quantity: int('quantity').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});