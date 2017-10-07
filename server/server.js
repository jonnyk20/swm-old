const io = require('socket.io')();
const Timer = require('./timer.js');

const t = new Timer([0, 10], [0, 5]);
t.startTimer();

t.on('tick', (type, str) => {
  console.log(type, str);
  io.emit('timerUpdate', type, str);
})





io.on('connection', (client) => {

  console.log("client connected");
  client.emit('timer', 'welcome!');



  // timer code

  client.on('requestStatus', function(){
    console.log('status sent')
    client.emit('timerStatus', t.timerInfo)
  })

  client.on('modifyTimer', function(command, newStudyTime, newBreakTime) {
    console.log('command from client:', command);
    t.accessTimer(command, newStudyTime, newBreakTime);
    client.emit('timerStatus', t.timerInfo)
  });

  client.on('disconnect', function() {
    console.log('client disconneted!');
  });



  // chat code







});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);