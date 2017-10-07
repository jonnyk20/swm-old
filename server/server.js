const io = require('socket.io')();
const Timer = require('./timer.js');
const uuidv1 = require('uuid/v1');

const t = new Timer([0, 10], [0, 5]);
t.startTimer();

t.on('tick', (type, str) => {
  console.log(type, str);
  io.emit('timerUpdate', type, str);
})





io.on('connection', (client) => {

  console.log("client connected");
  client.emit('timer', 'welcome!');

  client.on('disconnect', function() {
    console.log('client disconneted!');
  });




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


  // chat code
  client.on('messageSubmit', function(message){
    const submittedMesage = JSON.parse(message);
    submittedMesage.id = uuidv1();
    io.emit('newMessage', JSON.stringify(submittedMesage));
  })






});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);