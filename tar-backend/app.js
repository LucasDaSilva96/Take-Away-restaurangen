import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

//Importing the routes
import menuRouter from './routes/menu.js';
import orderRouter from './routes/order.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config({ path: './.env' });

// Routes
app.use('/menu', menuRouter);
app.use('/order', orderRouter);

app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});

export { app };
