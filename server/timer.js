const leftPad = require('left-pad');
const moment = require('moment');

const duration = moment.duration(15, 'seconds');

const pad = (num) => leftPad(num, 2, '0');

const count = setInterval(function(){
  const currentHours = duration.get('hours');
  const currentMinutes = duration.get('minutes');
  const currentSeconds = duration.get('seconds');

  
  console.log(pad(current))
  duration.subtract(1, 'second');
}, 1000)

const clear = setTimeout(function(){
	clearTimeout(count);
}, 3000);