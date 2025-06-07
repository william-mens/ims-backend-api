import { Hono } from 'hono';
import { globalConfig } from '../controllers/configController';

const configRouter = new Hono();

configRouter.get('/config',async(c) => await globalConfig(c))

export default configRouter;
