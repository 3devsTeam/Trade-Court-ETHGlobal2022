module.exports = (io, socket) => {
  socket.on("msg", (data) => console.log(data))

  socket.on("joinOffer", (data) => {
    socket.join(data.id)
    // console.log(data);
    // socket.to(data.id).emit("setChat", data);
    //socket.to(data.id).emit("setChat", (data) => console.log(data));
    // socket.to(data.id).emit("setChat", (data) => {
    //   console.log(data);
    // return {
    //   addressOrName: data.addressOrName,
    //   avatar: data.avatar,
    // };
    // });
    console.log("join room", data, "------")
  })

  socket.on("sendMessage", (data) => {
    console.log(data)
    socket.to(data.room).emit("messageRecieved", data.message)
  })

  socket.on("takerConfirmed", (offerId) => {
    console.log("taker confirmed")
    socket.to(offerId).emit("approvalStage")
  })

  socket.on("makerConfirmed", (offerId) => {
    console.log("maker confirmed!")
    socket.to(offerId).emit("successStage")
  })
}
