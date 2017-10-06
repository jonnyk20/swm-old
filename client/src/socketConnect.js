import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000', {'reconnection': false});

function subscribeToTimer(interval, cb) {
  socket.on('timer', str => cb(null, str));
} 

socket.on('connect_error', function() {
    console.log('Connection failed');
});
socket.on('reconnect_failed', function() {
    console.log('Reconnection failed');
});

function modifyTimer(command, newStudyTime, newBreakTime){
  socket.emit('modifyTimer', command, newStudyTime, newBreakTime);
  console.log('modify event emitted');
  console.log(command, newStudyTime, newBreakTime);
}

export { 
  subscribeToTimer,
  modifyTimer
};