const leftPad = require('left-pad');
const moment = require('moment');
const timerStates = require('./timerStates');

var events = require('events');
var eventEmitter = new events.EventEmitter();

const pad = (num) => leftPad(num, 2, '0');

let timerState = timerStates.STOPPED;
let countDown;

let studyTime = moment.duration(10, 'seconds');
let currentTime; 

let breakTime = moment.duration(5, 'seconds');

function setTime(studyTimeArray, breakTimeArray){
  const newStudyTime = moment.duration({
    minutes: studyTimeArray[1],
    seconds: studyTimeArray[2]
  })
  const newBreakTime = moment.duration({
    minutes: breakTimeArray[1],
    seconds: breakTimeArray[2]
  });

  breakTime = newBreakTime;
  studyTime = newStudyTime;
}

function startTimer(first) {
  countDown = setInterval(reduceTimer, 1000);
  return startStudy();
}

function resumeTimer() {
  countDown = setInterval(reduceTimer, 1000);
  return;
}

function startStudy() {
  currentTime = moment.duration(studyTime.asMilliseconds());
  outputString('alert', "Starting Study");
  timerState = timerStates.STUDY;
  return;
}

function startBreak() {
  currentTime = moment.duration(breakTime.asMilliseconds());
  outputString('alert', "Starting Break");
  timerState = timerStates.BREAK;
  return;
}

function reduceTimer() {
  const currentMinutes = currentTime.minutes();
  const currentSeconds = currentTime.seconds();
  const timeString = `${pad(currentMinutes)}:${pad(currentSeconds)}`
  outputString('time', timeString);
  if (currentMinutes === 0 &&
      currentSeconds === 0 )
    {
      if (timerState === timerStates.STUDY) {
        return startBreak();
      } else {
        return startStudy();
      }
    } 
  return currentTime.subtract(1, 'second');
}



function stopTimer(){
  timerState = timerStates.STOPPED;
  outputString('alert', "Stopped Timer");
  return clearTimeout(countDown);
}

function pauseTimer(){
  outputString('alert', "Paused Timer");
  return clearTimeout(countDown);
}

function outputString(type, str){
  console.log(str)
  eventEmitter.emit('timeChange', str);
}

setTime([0, 7], [0, 3]);


function onTimerModified(command, studyTime, breakTime){
  console.log('timer modify command received by timer!');

  switch (command){
    case 'stop':
      stopTimer();
      break;
    case 'pause':
      pauseTimer();
      break;
    case 'start':
      startTimer();
      break;
    case 'resume':
      resumeTimer();
      break;
    case 'setTime':
     // console.log(studyTime, breakTime)
      setTime(studyTime, breakTime);
      break;
    default:
      console.log('command not recognized');
  }
}

eventEmitter.on('modifyTimer', onTimerModified);


// setTimeout(() => {
//   eventEmitter.emit('modifyTimer', 'start');
// }, 5000);

// setTimeout(() => {
//   eventEmitter.emit('modifyTimer', 'start');
// }, 10000);

// setTimeout(() => {
//   eventEmitter.emit('modifyTimer', 'pause');
// }, 15000);

// setTimeout(() => {
//   eventEmitter.emit('modifyTimer', 'resume');
// }, 20000);

// setTimeout(() => {
//   eventEmitter.emit('modifyTimer', 'stop');
// }, 25000);

module.exports = {
  eventEmitter: eventEmitter
}