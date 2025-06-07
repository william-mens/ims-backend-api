import { int, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const productStockLogs = mysqlTable('product_stock_logs', {
    id: varchar('id', { length: 36 }).primaryKey(),
    productId: varchar('product_id', { length: 36 }).notNull(),
    type: mysqlEnum('type', ['initial', 'addition', 'assignment']),
    quantity: int('quantity').notNull(), // use negative for deductions
    relatedBatchId: varchar('batch_id', { length: 36 }),
    remarks: varchar('remarks', { length: 255 }),
    created_at: timestamp('created_at').defaultNow(),
  });
  