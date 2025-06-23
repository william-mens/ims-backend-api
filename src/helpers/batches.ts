import { GetBatchResponse, GroupedBatchResponse } from "../types";

export function groupBatchWithAuditLogs(rows: any[]) {
    const grouped = new Map<string, GroupedBatchResponse>();
   
    for (const row of rows) {
      const batchId = row.batches.id;
  
      if (!grouped.has(batchId)) {
        grouped.set(batchId, {
            batches: row.batches,
            product: row.product,
            merchant: row.merchants,
            createdBy: row.userInfo,
            batchAuditLog: [],
        });
      }
  
      if (row.batchAuditLog?.id) {
       
        grouped.get(batchId)!.batchAuditLog.push({
          id: row.batchAuditLog.id,
          batchId: row.batchAuditLog.batchId,
          fromStageId: row.batchAuditLog.fromStageId,
          fromStage: row.fromStage,
          toStageId: row.batchAuditLog.toStageId,
          toStage: row.toStage,
          movedBy: row.movedBy,
          notes: row.batchAuditLog.notes,
          issuesDetected: row.batchAuditLog.issuesDetected,
          movedAt: row.batchAuditLog.movedAt,
        });
        
      }
    }
  
    return Array.from(grouped.values());
  }
