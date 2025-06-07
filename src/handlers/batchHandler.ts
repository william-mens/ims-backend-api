import { Hono } from 'hono';
import {
    getAll,
    getAllBatchReturns,
    getAllBatchStages,
    store,
    storeBatchReturns,
    trackBatch,
    update,
} from '../controllers/batchController';

const batchRouter = new Hono();

batchRouter.get('/batches',async(c) => await getAll(c))
batchRouter.post('/batch',async(c) => await store(c))
batchRouter.put('/batch',async(c) => await update(c))

batchRouter.get('/batches/stages',async(c) => await getAllBatchStages(c))
batchRouter.get('/batches/returns',async(c) => await getAllBatchReturns(c))
batchRouter.post('/batches/move-stage',async(c) => await trackBatch(c))
batchRouter.post('/batches/returns',async(c) => await storeBatchReturns(c))



export default batchRouter;
