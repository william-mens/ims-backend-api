import { Hono } from 'hono';
import { getAll, store, update } from '../controllers/productController';
import {zodValidator} from '../middleware/validate';
import { CreateProductSchema, UpdateProductSchema } from '../schema';


const productRouter = new Hono();

productRouter.get('/merchants/:merchantId/products', async (c) => await getAll(c));

productRouter.post(
    '/merchants/:merchantId/products',
    // zodValidator(CreateProductSchema),
    async (c) => await store(c),
);

productRouter.put(
    '/merchants/:merchantId/products',
    // zodValidator(UpdateProductSchema),
    async (c) => await update(c),
);

export default productRouter;
