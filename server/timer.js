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

function setStudyTime(hours = 0, minutes = 0, seconds = 0){
  const newStudyTime = moment.duration({
    hours: hours,
    minutes: minutes,
    seconds: seconds
  })
  studyTime = newStudyTime;
}

function startTimer() {
  countDown = setInterval(reduceTimer, 1000);
  return startStudy();
}

function startStudy() {
  if (timerState !== timerStates.PAUSED ){
    currentTime = moment.duration(studyTime.asMilliseconds());
  }
  outputString('alert', "Starting Study");
  timerState = timerStates.RUNNING;
}


function reduceTimer() {
  const currentHours = currentTime.get('hours');
  const currentMinutes = currentTime.get('minutes');
  const currentSeconds = currentTime.get('seconds');
  const timeString = `${pad(currentHours)}:${pad(currentMinutes)}:${pad(currentSeconds)}`
  outputString('time', timeString);
  if (currentHours === 0 &&
      currentMinutes === 0 &&
      currentSeconds === 0 )
    {
      if (timerState === timerStates.RUNNING) {
        return startBreak();
      } else {
        return startStudy();
      }
    } 
  return currentTime.subtract(1, 'second');
}

function startBreak() {
  if (timerState !== timerStates.PAUSED ){
    currentTime = moment.duration(breakTime.asMilliseconds());
  }
  outputString('alert', "Starting Break");
  timerState = timerStates.BREAK;
}

function stopTimer(){
  timerState = timerStates.STOPPED;
  outputString('alert', "Stopped Timer");
  return clearTimeout(countDown);
}

function pauseTimer(){
  outputString('alert', "Paused Timer");
  timerState = timerStates.PAUSED;
  return clearTimeout(countDown);
}

function outputString(type, str){
  eventEmitter.emit('timeChange', str);
}

setStudyTime(0, 0, 10);
startTimer();

module.exports = {
  eventEmitter: eventEmitter
}