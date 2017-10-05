const io = require('socket.io')();
const timer = require('./timer.js');

io.on('connection', (client) => {
  console.log("client connected");
  client.emit('timer', 'welcome!');
 
  const timerUpdate = function (str) {
    client.emit('timer', str);
    console.log('New string emitted', str);
  }

  client.on('disconnect', function() {
      console.log('client disconneted!');
   });

  timer.eventEmitter.on('timeChange', timerUpdate);
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);