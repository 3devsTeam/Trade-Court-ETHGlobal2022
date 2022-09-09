const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

const app = require('./app');
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('connected');
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app is running port ${port}`);
});
