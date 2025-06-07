import { int, mysqlTable,text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const batchReturn = mysqlTable('batch_returns', {
  id: varchar('id',{length:36}).primaryKey(),
  batchId: varchar('batch_id',{length:36}).notNull(),
  quantityReturned: int('quantity_returned'),
  reason: text('reason'),
  returnedBy: text('returned_by'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});