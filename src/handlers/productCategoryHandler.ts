import { Hono } from 'hono';
import { getAll, store, update } from '../controllers/productCategoriesController';

const productCategoryRouter = new Hono();

productCategoryRouter.get('/categories/:merchantId',async(c) => await getAll(c))
productCategoryRouter.post('/categories',async(c) => await store(c))
productCategoryRouter.put('/categories/:merchantId',async(c) => await update(c))


export default productCategoryRouter;
