const io = require('socket.io')();
const timer = require('./timer.js');
const Timer = require('./timer2.js');

// const t = setInterval(() => {
//   io.broadcast('timer');
// }, 1000);

const t = new Timer(1);

t.on('tick', (ts) => {
  console.log('tick', ts);
  io.emit('tick', {ts});
})

io.on('connection', (client) => {
  console.log("client connected");
  client.emit('timer', 'welcome!');

  client.on('start', () => t.start());
  client.on('stop', () => t.stop());
 
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