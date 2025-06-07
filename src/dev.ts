import { serve } from '@hono/node-server';
import app from './index';
import 'dotenv/config';

const port = process.env.PORT || 3000
console.log(`🚀 Server running at http://localhost:${port}`)

serve({ fetch: app.fetch, port: Number(port) })