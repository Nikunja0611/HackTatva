const { Server } = require('socket.io');

let io;
function initSocket(httpServer){
  io = new Server(httpServer, { cors: { origin: process.env.CLIENT_URL || '*' }});
  io.on('connection', socket=>{
    socket.on('join_event', eventId => socket.join(`event:${eventId}`));
    socket.on('announce', ({eventId, message}) => io.to(`event:${eventId}`).emit('announce', {message, ts:Date.now()}));
  });
}
function emitLeaderboard(eventId, payload){
  if(!io) return;
  io.to(`event:${eventId}`).emit('leaderboard', payload);
}
module.exports = { initSocket, emitLeaderboard };
