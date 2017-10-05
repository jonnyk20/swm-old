const io = require('socket.io')();
const timer = require('/timer.js');

io.on('connection', (client) => {
  console.log("client connected");

  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  socket.on('disconnect', function() {
      console.log('client disconneted!');
   });

});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);