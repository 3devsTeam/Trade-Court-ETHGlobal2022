const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const indexRouter = require('./routes/index');
const cookieParser = require('cookie-parser');

const globalErrorHandler = require('./utils/errorController');

const app = express();

app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(globalErrorHandler);
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

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/api', indexRouter);
app.get('/*', function (req, res) {
  res.sendFile(
    path.join(__dirname, '../client/dist/index.html'),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

module.exports = app;
