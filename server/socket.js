module.exports = (io, socket) => {
  console.log("socket connected");
  socket.emit("msg", "piski");
};
