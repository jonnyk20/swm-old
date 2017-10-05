const io = require('socket.io')();
const timer = require('./timer.js');

io.on('connection', (client) => {
  console.log("client connected");
  client.emit('timer', 'welcome!');
 
  const timerUpdate = function (str) {
    client.emit('timer', str);
  }

  client.on('modifyTimer', function(command, payload) {
    console.log('command from client:', command);
    timer.eventEmitter.emit('modifyTimer', command, payload);
  });

  client.on('disconnect', function() {
    console.log('client disconneted!');
  });

  timer.eventEmitter.on('timeChange', timerUpdate);
});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);