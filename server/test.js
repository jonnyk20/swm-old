const timer = require('./timer.js');

//var io = require('./socket').listen(3001);
//console.log('listening on port ', port);



//Create an event handler:
var myEventHandler = function (str) {
  console.log('New string emitted', str);
}

//Assign the event handler to an event:
timer.eventEmitter.on('timeChange', myEventHandler);

//Fire the 'scream' event:
