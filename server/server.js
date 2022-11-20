const dotenv = require('dotenv');
const mongoose = require('mongoose');
const socketHandler = require('./socket');
const app = require('./app');

if (process.env.NODE_ENV == 'prod') {
  dotenv.config({ path: '../../../../conffiles/config.env' });
} else if (process.env.NODE_ENV == 'dev') {
  dotenv.config({ path: './config.env' });
}
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

//test linear

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  reconnection: true,
  reconnectionDelay: 3000,
  reconnectionAttempts: 20,
  forceNew: true,
  cors: {
    origin: 'http://161.35.83.140:3030',
    credentials: true,
  },
});
// const onConnection = (socket) => {
//   socketHandler(socket)
// }
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.on('join_room', (data) => {
    const { id } = data;
    socket.join(id);
    console.log(`User ${socket.id} joined the room ${id}`);
  });

  socket.on('send_message', (data) => {
    const { room } = data;
    io.to(room).emit('receive_message', data);
  });

  socket.on("typing", (id) => {
    console.log(id)
    io.to(id).emit("typingResponse")
  })

  socket.on("takerConfirmed", (id) => {
    console.log("taker confirmed")
    io.to(id).emit("approvalStage")
  })

  socket.on("makerConfirmed", (id) => {
    console.log("maker confirmed!")
    io.to(id).emit("successStage")
  })
})

