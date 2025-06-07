import { int, mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const userInfo = mysqlTable('user_info', {
    userId: varchar('user_id', { length: 36 }).primaryKey(),
    lastName: varchar('last_name', { length: 100 }).notNull(),
    otherNames: varchar('other_names', { length: 100 }).notNull(),
    mobile: varchar('mobile', { length: 100 }).notNull(),
    imageUrl: varchar('image_url', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
  });
  