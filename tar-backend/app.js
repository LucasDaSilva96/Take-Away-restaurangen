const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

//Importing the routes
const menuRouter = require('./routes/menu');

const app = express();
app.use(cors());
app.use(bodyParser.json());
dotenv.config({ path: './.env' });

// Routes
app.use('/menu', menuRouter);

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

module.exports = app;
