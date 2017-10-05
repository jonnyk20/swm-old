const io = require('socket.io')();
const timer = require('/timer.js');

io.on('connection', (client) => {
  console.log("client connected");
  client.emit('timer', 'welcome!');
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', 1000);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  io.on('disconnect', function() {
      console.log('client disconneted!');
   });

});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);