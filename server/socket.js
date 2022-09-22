module.exports = (io, socket) => {
  socket.on("msg", (data) => console.log(data));

  socket.on("joinOffer", (data) => {
    socket.join(data.id);
    console.log(data);
  });
  // socket.on("changeStage", (offerId) => {
  //   console.log("change stage");
  //   socket.to(offerId).emit("newStage");
  // });
  socket.on("takerConfirmed", (offerId) => {
    console.log("taker confirmed");
    socket.to(offerId).emit("approvalStage");
  });

  socket.on("makerConfirmed", (offerId) => {
    console.log("maker confirmed!");
    socket.to(offerId).emit("successStage");
  });
};

// const socket = io('http://127.0.0.1:3030');

// socket.on('msg', (data) => console.log(data));
// api/joinRoom получешь саксес
//заходит socket.emit('joinOffer', {userId, offerId})

//socket.emit('changeStage', offerId)

//socket.on('newStage', ()=>{обонвляешь компонент})
