module.exports = (io, socket) => {
  socket.on('joinOffer', (data) => {
    socket.join(data.offerId);
  });
  socket.on('changeStage', (offerId) => {
    io.to(offerId).emit('newStage');
  });
};

// const socket = io('http://127.0.0.1:3030');

// socket.on('msg', (data) => console.log(data));
// api/joinRoom получешь саксес
//заходит socket.emit('joinOffer', {userId, offerId})

//socket.emit('changeStage', offerId)

//socket.on('newStage', ()=>{обонвляешь компонент})
