const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const socketHandler = require('./socket');

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

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
    credentials: true,
  },
});
const onConnection = (socket) => {
  socketHandler(io, socket);
};
io.on('connection', onConnection);
