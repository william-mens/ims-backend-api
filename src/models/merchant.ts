import { alias } from 'drizzle-orm/gel-core'
import { mysqlTable, mysqlEnum, varchar } from 'drizzle-orm/mysql-core'

export const merchants = mysqlTable('merchants', {
  id: varchar('id', { length: 36 }).primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  logo: varchar('logo', { length: 200 }),
  alias: varchar('alias', { length: 10 }).notNull(),
  companyType: varchar('company_type', { length: 15 }).notNull(),
  country: varchar('country', { length: 2 }).notNull(),
  status: mysqlEnum(['active', 'inactive']).default('active').notNull(),
  companyRegistrationNumber: varchar('company_registration_number', {
    length: 15,
  }).notNull(),
})
