import { Context } from 'hono';
import { getStages, setupWorkflowStages, updateWorkflowStage } from '../services/workflowStagesServices';
import { Product, workflowStage } from '../types';
import { prepareResponse } from '../helpers/response';

export const getAll = async (c: Context) => {
    try {
        console.log('about to get merchant stages', c.req.param('merchantId'));

        const merchantId = c.req.param('merchantId');
        const stages = await getStages(merchantId);
        console.log('successfully retrieved stages', stages);

        return c.json(prepareResponse('success', stages ));
    } catch (error) {
        console.error('Error retrieving workflow stages:', error);
        return c.json(prepareResponse('failure', {} ));
    }
};


export const store = async (c: Context) => {
    try {
        const merchantId = c.req.param('merchantId');
        const body = await c.req.json<workflowStage[]>();
        console.log('about store workflow stages', { merchantId, body });

        const response = await setupWorkflowStages(merchantId, body);

        return c.json(prepareResponse('success_resource_created', response ));
    } catch (error: any) {
        console.error('Error creating workflow stages:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return c.json(
                prepareResponse(
                    'bad_request',
                    {},
                     
                    'Record already exists. Check your merchantId.',
                ),
            );
        }

        return c.json(prepareResponse('failure', {} ));
    }
};

export const update = async (c: Context) => {
    try {
        const body = await c.req.json<workflowStage[]>();
        const merchantId = c.req.param('merchantId');

        console.log('about to update workflow stages', { merchantId, body });

        const updated = await updateWorkflowStage(merchantId, body);

        return c.json(prepareResponse('success', updated ));
    } catch (error) {
        console.error('Error updating product:', error);
        return c.json(prepareResponse('failure', {} ));
    }
};