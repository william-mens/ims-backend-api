import { getDb } from '../db';
import { batches } from '../models/batch';
import { products } from '../models/product';
import { merchants } from '../models/merchant';
import { eq, and } from 'drizzle-orm';
import { Batch, getBatchAuditLog } from '../types';
import { getProductById } from './productService';
import { batchAuditLog } from '../models/batchAuditLogs';
import { batchReturn } from '../models/batchReturns';
import { workflowStages } from '../models/workflowStages';
import { alias } from 'drizzle-orm/mysql-core';
import { generateUniqueBatchCode } from '../helpers/generateUniqueBatchCode';
import { userInfo } from '../models/userInfo';
import { groupBatchWithAuditLogs } from '../helpers/batches';
import { BadExceptionError } from '../helpers/exception';

export const getBatches = async (query: Batch) => {
    const db = await getDb();

    const batchAuditAlias = alias(batchAuditLog, 'batchAuditLog');
    const userInfoAlias = alias(userInfo, 'userInfo');
    const fromStageAlias = alias(workflowStages, 'fromStage');
    const toStageAlias = alias(workflowStages, 'toStage');

    const whereConditions = [eq(batches.merchantId, query.merchantId!)];
    if (query.id) whereConditions.push(eq(batches.id, query.id));

    const result = await db
        .select()
        .from(batches)
        .leftJoin(batchAuditAlias, eq(batches.id, batchAuditAlias.batchId))
        .leftJoin(fromStageAlias, eq(batchAuditAlias.fromStageId, fromStageAlias.id))
        .leftJoin(toStageAlias, eq(batchAuditAlias.toStageId, toStageAlias.id))
        .leftJoin(merchants, eq(merchants.id, batches.merchantId))
        .leftJoin(userInfoAlias, eq(userInfoAlias.userId, batches.createdBy))
        .where(and(...whereConditions));
        
    return groupBatchWithAuditLogs(result);
};

export const getBatchStages = async (query: getBatchAuditLog) => {
    const db = await getDb();
    const whereConditions = [];
    if (query.batchId) whereConditions.push(eq(batchAuditLog.batchId, query.batchId));

    const fromStageAlias = alias(workflowStages, 'from_stage_id');
    const toStageAlias = alias(workflowStages, 'to_stage_id');

    const result = await db
        .select({
            batchAudit: batchAuditLog,
            fromStage: fromStageAlias,
            toStage: toStageAlias,
        })
        .from(batchAuditLog)
        .leftJoin(fromStageAlias, eq(fromStageAlias.id, batchAuditLog.fromStageId))
        .leftJoin(toStageAlias, eq(toStageAlias.id, batchAuditLog.toStageId))
        .where(and(...whereConditions));
    return result;
};

export const getBatchReturns = async (query: getBatchAuditLog) => {
    const db = await getDb();

    const whereConditions = [];
    if (query.batchId) whereConditions.push(eq(batchReturn.batchId, query.batchId));

    const result = await db
        .select()
        .from(batchReturn)
        .where(and(...whereConditions));
    return result;
};


export const setupBatch = async (batch: typeof batches.$inferInsert) => {

    const db = await getDb();

    const findProduct = await getProductById(batch.merchantId!, batch.productId!);
    console.log(`merchantId:${batch.merchantId} successfully retrieved merchant products`,findProduct);
    
    if (!findProduct) {

        console.error(
            `Product not found: No product with ID ${batch.productId} exists for merchant ${batch.merchantId}`
          ); 
          
          throw new BadExceptionError(
            `Product ${batch.productId} not found for merchant ${batch.merchantId}`
          );
    }

    const batchId = crypto.randomUUID();
    const batchCode = await generateUniqueBatchCode(batch.merchantId);

    const batchRequest = {
        id: batchId as string,
        merchantId: batch.merchantId,
        productId: batch.productId,
        batchCode: batchCode,
        quantity: findProduct.quantity,
        createdBy: batch.createdBy,
    };

    console.log(`merchantId:${batch.merchantId} about to batch request`,batchRequest);

    const findMerchantWorkStage = await db
        .select()
        .from(workflowStages)
        .where(
            and(
                eq(workflowStages.merchantId, batchRequest.merchantId!),
                eq(workflowStages.position, 1),
            ),
        );

    if (findMerchantWorkStage.length == 0) {
        throw new BadExceptionError(`no workflow stages found for merchantId:${batch.merchantId}`)
    }

    const merchantWorkStage = findMerchantWorkStage[0];

    console.log(`merchantId:${batch.merchantId} find workflow stages`,merchantWorkStage);

    const batchAuditLogRequest = {
        id: crypto.randomUUID() as string,
        batchId: batchRequest.id,
        fromStageId: merchantWorkStage.id,
        toStageId: merchantWorkStage.id,
        movedBy: batchRequest.createdBy,
    };

    console.log(`merchantId:${batch.merchantId} about to create batchAuditLogRequest `,batchAuditLogRequest);

    await db.transaction(async (tx) => {
        await tx.insert(batches).values(batchRequest);
        await tx.insert(batchAuditLog).values(batchAuditLogRequest);
    });

    return await getSingleBatch(batch.merchantId, batchId);
};

export const trackBatchStage = async (batch: typeof batchAuditLog.$inferInsert) => {
    const db = await getDb();

    const batchAuditId = crypto.randomUUID();
    const batchRequest = { ...{ id: batchAuditId as string }, ...batch };

    await db.insert(batchAuditLog).values(batchRequest);

    return await getSingleBatchAudit(batchAuditId);
};

export const batchReturns = async (batch: typeof batchReturn.$inferInsert) => {
    const db = await getDb();

    const batchReturnId = crypto.randomUUID();
    const batchRequest = { ...{ id: batchReturnId as string }, ...batch };

    await db.insert(batchReturn).values(batchRequest);

    return await getSingleBatchReturn(batchReturnId);
};

export const updateBatch = async (updates: Partial<typeof batches.$inferInsert>) => {
    const db = await getDb();
    await db
        .update(batches)
        .set(updates)
        .where(and(eq(batches.id, updates.id!), eq(batches.merchantId, updates.merchantId!)));

    return await getSingleBatch(updates.merchantId!, updates.id!);
};

const getSingleBatch = async (merchantId: string, batchId: string) => {
    const db = await getDb();
   
    const batchAuditAlias = alias(batchAuditLog, 'batchAuditLog');
    const userInfoAlias = alias(userInfo, 'userInfo');
    const fromStageAlias = alias(workflowStages, 'fromStage');
    const toStageAlias = alias(workflowStages, 'toStage');

    const result = await db
        .select()
        .from(batches)
        .leftJoin(batchAuditAlias, eq(batches.id, batchAuditAlias.batchId))
        .leftJoin(fromStageAlias, eq(batchAuditAlias.fromStageId, fromStageAlias.id))
        .leftJoin(toStageAlias, eq(batchAuditAlias.toStageId, toStageAlias.id))
        .leftJoin(merchants, eq(merchants.id, batches.merchantId))
        .leftJoin(userInfoAlias, eq(userInfoAlias.userId, batches.createdBy)) 
        .where(and(eq(batches.merchantId, merchantId), eq(batches.id, batchId)));
    
    console.log('result response from query',JSON.stringify(result));
    
    return groupBatchWithAuditLogs(result)[0];
};

const getSingleBatchAudit = async (bathAuditId: string) => {
    const db = await getDb();

    const result = await db.select().from(batchAuditLog).where(eq(batchAuditLog.id, bathAuditId));
    return result[0];
};

const getSingleBatchReturn = async (bathReturnId: string) => {
    const db = await getDb();

    const result = await db.select().from(batchReturn).where(eq(batchReturn.id, bathReturnId));
    return result[0];
};




