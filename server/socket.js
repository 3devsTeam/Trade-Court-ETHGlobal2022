module.exports = (socket) => {
  console.log(`User Connected: ${socket.id}`)
  socket.on("join_room", (data) => {
    const { id } = data
    socket.join(id)
    console.log(`User ${socket.id} joined the room ${id}`)
  })

  socket.on("send_message", (data) => {
    const { room } = data
    io.in(room).emit("receive_message", data)
  })

  socket.on("takerConfirmed", (id) => {
    console.log("taker confirmed")
    socket.to(id).emit("approvalStage")
  })

  socket.on("makerConfirmed", (id) => {
    console.log("maker confirmed!")
    socket.to(id).emit("successStage")
  })
}
