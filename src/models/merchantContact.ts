import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const merchantContact = mysqlTable('merchants', {
  id: varchar('id',{length:36}).primaryKey(),
  lastName: varchar('last_name',{length:100}).notNull(),
  merchantId: varchar('merchant_id', { length: 200 }).notNull(),
  otherName: varchar('other_name',{ length: 200 }).notNull(),
  email: varchar('email',{length: 100}).notNull(),
  mobile: varchar('mobile',{length:100}).notNull(),

});