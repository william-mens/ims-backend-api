import { mysqlTable, decimal, varchar, timestamp, int } from 'drizzle-orm/mysql-core';

export const products = mysqlTable('products', {
  id: varchar('id',{length:36}).primaryKey(),
  merchantId: varchar('merchant_id',{length:36}).notNull(),
  name: varchar('name',{ length: 255 }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  logo: varchar('logo',{length: 200}),
  quantity:int('quantity').notNull(),
  description: varchar('description',{ length: 255 }).notNull(),
  sku:varchar('sku',{ length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),

});