import { Router } from 'express';
import * as productsController from './products/products';
import * as salesController from './sales/sales';

const app = Router();

app.get('/v1/products', productsController.list);
app.get('/v1/products/:id', productsController.retrieve);
app.get('/v1/sales', salesController.list);
app.get('/v1/sales/:id', salesController.retrieve);
app.post('/v1/products', productsController.create);
app.post('/v1/sales', salesController.create);
export default app;
