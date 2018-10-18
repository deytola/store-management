import express from 'express';
import products from './products';
import sales from './sales';

const app = express();
app.use('/api/v1/products', products);
app.use('/api/v1/sales', sales);

app.listen(4000, () => {
  // console.log('listening on port 4000...');
});
