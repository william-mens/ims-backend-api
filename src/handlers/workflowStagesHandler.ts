import { Hono } from 'hono';
import { getAll, store, update } from '../controllers/workflowStagesController';

const workflowStagesRouter = new Hono();

workflowStagesRouter.get('/merchants/:merchantId/workflow-stages',async(c) => await getAll(c))
workflowStagesRouter.post('/merchants/:merchantId/workflow-stages',async(c) => await store(c))
workflowStagesRouter.put('/merchants/:merchantId/workflow-stages',async(c) => await update(c))

export default workflowStagesRouter;
