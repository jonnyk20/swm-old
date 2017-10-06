const io = require('socket.io')();
//const timer = require('./timer.js');
const Timer = require('./timer2.js');


const t = new Timer([0, 10], [0, 5]);
t.startTimer();

t.on('tick', (type, str) => {
  console.log(type, str);
  io.emit('timer', str);
})

io.on('connection', (client) => {
  console.log("client connected");
  client.emit('timer', 'welcome!');

  client.on('modifyTimer', function(command, newStudyTime, newBreakTime) {
    console.log('command from client:', command);
    t.accessTimer(command, newStudyTime, newBreakTime);
  });

  // const timerUpdate = function (str) {
  //   client.emit('timer', str);
  // }

  // client.on('timerStop', () => clearInterval(t));

  // client.on('modifyTimer', function(command, newStudyTime, newBreakTime) {
  //   console.log('command from client:', command);
  //   timer.eventEmitter.emit('modifyTimer', command, newStudyTime, newBreakTime);
  // });

  client.on('disconnect', function() {
    console.log('client disconneted!');
  });

  //timer.eventEmitter.on('timeChange', timerUpdate);
});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);