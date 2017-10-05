import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToTimer(interval, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
} 

function modifyTimer(command, payload){
  socket.emit('modifyTimer', command, JSON.stringify(payload) || null);
  console.log('modify event emitted');
}

setTimeout( () => modifyTimer('pause'), 5000);
setTimeout( () => modifyTimer('start'), 10000);

export { 
  subscribeToTimer,
  modifyTimer
};