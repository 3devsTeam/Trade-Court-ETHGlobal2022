const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./utils/errorController');

const app = express();
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(
  cors({
    origin: 'http://161.35.83.140:3030',
    credentials: true,
  })
);

app.options('*', cors());

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use('/api', indexRouter);
app.use(globalErrorHandler);

module.exports = app;
