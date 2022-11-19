module.exports = (socket) => {
  console.log(`User Connected: ${socket.id}`)
  socket.on("joinOffer", (data) => {
    console.log(data)
    socket.join(data.id)
    console.log(socket)
  })

  socket.on("send_message", (data) => {
    console.log(data)
    socket.to(data.room).emit("message_recieved", data)
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
