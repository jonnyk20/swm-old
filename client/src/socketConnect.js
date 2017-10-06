import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000', {'reconnection': false});


socket.on('connection', )

socket.on('connect_error', function() {
  console.log('Connection failed');
});
socket.on('reconnect_failed', function() {
  console.log('Reconnection failed');
});

function subscribeToTimer(onInitiated, onUpdated) {
  socket.emit('requestStatus');
  socket.on('timerStatus', function(status){
    console.log('status received')
    onInitiated(null, status);
  })
  socket.on('timerUpdate', (type, str) => onUpdated(type, str))
  console.log('request for status sent');
} 
function modifyTimer(command, newStudyTime, newBreakTime){
  socket.emit('modifyTimer', command, newStudyTime, newBreakTime);
  console.log('modify event emitted');
  console.log(command, newStudyTime, newBreakTime);
}

export { 
  subscribeToTimer,
  modifyTimer
};