const dotenv = require("dotenv")
const mongoose = require("mongoose")
const socketHandler = require("./socket")
const app = require("./app")

if (process.env.NODE_ENV == "prod") {
  dotenv.config({ path: "../../../../conffiles/config.env" })
} else if (process.env.NODE_ENV == "dev") {
  dotenv.config({ path: "./config.env" })
}
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DB_PASSWORD)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected")
  })

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`app is running port ${port}`)
})

//test linear

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://127.0.0.1:5173",
    credentials: true,
  },
})
const onConnection = (socket) => {
  socketHandler(socket)
}
io.on("connection", onConnection)
