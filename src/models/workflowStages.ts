import { int, mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const workflowStages = mysqlTable('workflow_stages', {
  id: varchar('id',{length:36}).primaryKey(),
  merchantId: varchar('merchant_id',{length:36}).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  position: int('position').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});