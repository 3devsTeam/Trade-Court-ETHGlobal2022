const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors());
app.options('*', cors());

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
app.use(express.json({ limit: '10kb' }));

module.exports = app;
