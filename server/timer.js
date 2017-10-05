const leftPad = require('left-pad');
const moment = require('moment');
const pad = (num) => leftPad(num, 2, '0');

const duration = moment.duration(5, 'seconds');

const count = setInterval(function(){
  const currentHours = duration.get('hours');
  const currentMinutes = duration.get('minutes');
  const currentSeconds = duration.get('seconds');
  if (currentHours === 0 &&
      currentMinutes === 0 &&
      currentSeconds === 0 )
    {
      return clear();
    }
  console.log(pad(currentSeconds))
  duration.subtract(1, 'second');
}, 1000)

const clear = () => clearTimeout(count);
