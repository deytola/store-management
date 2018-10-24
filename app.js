import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const port = process.env.port || 4000; // port binding
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//import routes into the application
require('./server/routes')(app);

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

export default app;
