import { mysqlTable,text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const batchAuditLog = mysqlTable('batch_audit_logs', {
  id: varchar('id',{length:36}).primaryKey(),
  batchId: varchar('batch_id',{length:36}).notNull(),
  fromStageId: varchar('from_stage_id', { length: 36 }),
  toStageId: varchar('to_stage_id', { length: 36 }),
  movedBy: varchar('moved_by', { length: 36 }).notNull(),
  notes: text('notes'),
  issuesDetected: text('issues_detected'),
  movedAt: timestamp('moved_at').defaultNow().notNull()
});