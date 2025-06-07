import { Hono } from 'hono';
import { getAll, store, update } from '../controllers/merchantController';

const merchantRouter = new Hono();

merchantRouter.get('/merchants',async(c) => await getAll(c))
merchantRouter.post('/merchants',async(c) => await store(c))
merchantRouter.put('/merchants/:id',async(c) => await update(c))



export default merchantRouter;
