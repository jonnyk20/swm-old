const io = require('socket.io')();
const timer = require('./timer.js');

// const t = setInterval(() => {
//   io.broadcast('timer');
// }, 1000);

io.on('connection', (client) => {
  console.log("client connected");
  client.emit('timer', 'welcome!');
 
  const timerUpdate = function (str) {
    client.emit('timenr', str);
  }

  // client.on('timerStop', () => clearInterval(t));

  client.on('modifyTimer', function(command, newStudyTime, newBreakTime) {
    console.log('command from client:', command);
    timer.eventEmitter.emit('modifyTimer', command, newStudyTime, newBreakTime);
  });

  client.on('disconnect', function() {
    console.log('client disconneted!');
  });

  timer.eventEmitter.on('timeChange', timerUpdate);
});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);