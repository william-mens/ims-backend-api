import { Hono } from 'hono'
import merchantRouter from './handlers/merchantHandler'
import productCategoryRouter from './handlers/productCategoryHandler'
import productRouter from './handlers/productHandler'
import configRouter from './handlers/configHandler'
import workflowStagesRouter from './handlers/workflowStagesHandler'
import batchRouter from './handlers/batchHandler'
import { BadExceptionError } from './helpers/exception'
import { prepareResponse } from './helpers/response'


const app = new Hono()

app.route('/api/v1/', merchantRouter)
app.route('/api/v1/',productCategoryRouter)
app.route('/api/v1/',productRouter)
app.route('/api/v1/',configRouter)
app.route('/api/v1/',workflowStagesRouter)
app.route('/api/v1/',batchRouter)

app.all('*', (c) => {
    return c.json({ message: 'Fallback route hit', path: c.req.path }, 404);
});

app.get('/api/v1/ping', (c) => {
    return c.json({ message: 'pong' });
});


  app.onError((err, c:any) => {
    if (err instanceof BadExceptionError) {
      return c.json(prepareResponse('bad_request', {}));
    }
  })
  
export default app