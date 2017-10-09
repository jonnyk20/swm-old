const io = require('socket.io')();
const Timer = require('./timer.js');
const uuidv1 = require('uuid/v1');

const t = new Timer([25, 0], [5, 0]);
t.startTimer();

t.on('tick', (type, str) => {
  io.emit('timerUpdate', type, str);
})



let userCount = 0;
let userColor = 0;
io.on('connection', (client) => {
  userCount += 1;
  console.log('client connected! Client count', userCount.toString())

  client.emit('colorAssign', userColor.toString())
  userColor = userColor === 3 ? 0 : userColor + 1;

  const newUser ={
    id: uuidv1(),
    type: 'userCountChange',
    content: 'A new user has connected',
    userCount: userCount,
    timestamp: Date.now()
  }

  io.emit('newNotification', JSON.stringify(newUser))
  io.emit('userCountChange', userCount.toString())
  client.emit('timer', 'welcome!');

  client.on('disconnect', function() {
    userCount -= 1;
    console.log('client disconneted!');
    io.emit('userCountChange', userCount.toString())
    const departingUser ={
      id: uuidv1(),
      type: 'userCountChange',
      content: 'A user has disconnected',
      userCount: userCount,
      timestamp: Date.now()
    }
    io.emit('newNotification', JSON.stringify(departingUser));
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
    submittedMesage.timestamp = Date.now();
    io.emit('newMessage', JSON.stringify(submittedMesage));
  })

  client.on('nameChange', function(oldUsername, newUsername){
    console.log('name chaange received')
    console.log(oldUsername, newUsername)
    const nameChangeUpdate = {
      id: uuidv1(),
      type: 'nameChange',
      content: `${oldUsername} has changed their name ${newUsername}`,
      timestamp: Date.now()
    }
    io.emit('newNotification', JSON.stringify(nameChangeUpdate));
  })





});



const port = 8000;
io.listen(port);
console.log('listening on port ', port);