import { Context } from 'hono';
import { batchReturns, getBatches,getBatchReturns,getBatchStages,setupBatch , trackBatchStage, updateBatch } from '../services/batchService';
import { Batch, getBatchAuditLog } from '../types';
import { prepareResponse } from '../helpers/response';
import { batches } from '../models/batch';
import { batchAuditLog } from '../models/batchAuditLogs';
import { batchReturn } from '../models/batchReturns';

export const getAll = async (c: Context) => {
    try {

        const getBatchRequests = c.req.query() as unknown as Batch;
        console.log('about to retrive all batchRequests',getBatchRequests);
        
        const batches = await getBatches(getBatchRequests);
        console.log('successfully retrieved batches', batches);
        return c.json(prepareResponse('success', batches ));
    } catch (error) {
        console.error('an error occurred retrieving batches:', error);
        return c.json(prepareResponse('failure', {} ));
    }
};


export const trackBatch = async (c: Context) => {
    try {

        const body = await c.req.json<typeof batchAuditLog.$inferInsert>();
        console.log('about to create track batch', {body });
        const response = await trackBatchStage(body);

        return c.json(prepareResponse('success_resource_created', response ));
    } catch (error: any) {
        console.error('an error occurred creating batch track:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return c.json(
                prepareResponse(
                    'bad_request',
                    {},
                     
                    'Record already exists. Check your batchId.',
                ),
            );
        }

        return c.json(prepareResponse('failure', {} ));
    }
}; 


export const getAllBatchStages = async (c: Context) => {
    try {

        const stage = c.req.query() as unknown as getBatchAuditLog;
        console.log('about to get batch stages', {stage });
        const stages = await getBatchStages(stage);

        return c.json(prepareResponse('success', stages ));
    } catch (error: any) {
        console.error('an error occurred retrieving batch stages:', error);
        return c.json(prepareResponse('failure', {} ));
    }
}; 


export const getAllBatchReturns = async (c: Context) => {
    try {

        const stage = c.req.query() as unknown as getBatchAuditLog;
        console.log('about to get batch returns', {stage });
        const stages = await getBatchReturns(stage);

        return c.json(prepareResponse('success', stages ));
    } catch (error: any) {
        console.error('an error occurred retrieving batch stages:', error);
        return c.json(prepareResponse('failure', {} ));
    }
}; 


export const storeBatchReturns = async (c: Context) => {
    try {

        const body = await c.req.json<typeof batchReturn.$inferInsert>();
        console.log('about to store batch returns', {body });
        const response = await batchReturns(body);

        return c.json(prepareResponse('success_resource_created', response ));
    } catch (error: any) {
        console.error('an error occurred creating batch track:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return c.json(
                prepareResponse(
                    'bad_request',
                    {},
                     
                    'Record already exists. Check your batchId.',
                ),
            );
        }

        return c.json(prepareResponse('failure', {} ));
    }
}; 


export const store = async (c: Context) => {
    try {

        const body = await c.req.json<typeof batches.$inferInsert>();
        console.log('recieved request to create a batch', {body });
        const response = await setupBatch(body);
        return c.json(prepareResponse('success_resource_created', response ));
    } catch (error: any) {
        console.error('Error occurred creating a batch:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return c.json(
                prepareResponse(
                    'bad_request',
                    {},
                    'Record already exists. Check your merchantId.',
                ),
            );
        }

        return c.json(prepareResponse('failure', {}));
    }
};

export const update = async (c: Context) => {
    try {
        const body = await c.req.json<Partial<typeof batches.$inferInsert>>();

        console.log('about to update batch', {body });

        const updated = await updateBatch(body);
        return c.json(prepareResponse('success', updated ));
    } catch (error) {
        console.error('Error updating batch:', error);
        return c.json(prepareResponse('failure', {} ));
    }
};