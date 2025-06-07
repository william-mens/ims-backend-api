import { getDb } from '../db';
import { workflowStages } from '../models/workflowStages';
import { eq, and, like } from 'drizzle-orm';
import { workflowStage } from '../types';

export const getStages = async (merchantId: string) => {
  
  return await getWorkflowStageId(merchantId);
};

export const setupWorkflowStages = async (
  merchantId: string,
  stages: workflowStage[],
) => {

  const db = await getDb();
 const workflowStageRequests = stages.map((stage) => ({
            id:  crypto.randomUUID() as string,
            merchantId: merchantId,  
            name: stage.name,
            position: stage.position
  }));
 
 await db.insert(workflowStages).values(workflowStageRequests);

  return await getWorkflowStageId(merchantId);
};

export const updateWorkflowStage = async (
    merchantId: string,
  stages:  workflowStage[],
) => {
  const db = await getDb();

  await Promise.all(
    stages.map(({ id, ...data }) =>
      db
        .update(workflowStages)
        .set(data)
        .where(
          and(eq(workflowStages.id, id!), eq(workflowStages.merchantId, merchantId))
        )
    )
  );
 
  return await getWorkflowStageId(merchantId);
};

const getWorkflowStageId = async (merchantId: string) => {
    const db = await getDb();

    const result = await db
        .select()
        .from(workflowStages)
        .where(eq(workflowStages.merchantId, merchantId));
    return result;
};
