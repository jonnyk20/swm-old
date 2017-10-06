const { EventEmitter } = require('events');
const leftPad = require('left-pad');
const moment = require('moment');
const timerStates = require('./timerStates');
const timerCycles = require('./timerCycles');
const pad = (num) => leftPad(num, 2, '0');

class Timer extends EventEmitter {
  constructor(studyTimeArr, breakTimeArr) {
    super();
    this.setTimer(studyTimeArr, breakTimeArr);
    this._timerState = timerStates.STOPPED;
  }

  setTimer([studyMinutes, StudySeconds], [breakMinutes, breakSeconds]) {
    this._studyTime = moment.duration({
      minutes: studyMinutes,
      seconds: StudySeconds
    });
    this._breakTime = moment.duration({
      minutes: breakMinutes,
      seconds: breakSeconds
    });
  }
  
  startTimer() {
    if (this._timerState === timerStates.RUNNING) {
      return;
    }
    this._countDown = setInterval(() => this.reduceTimer(), 1000);
    this._timerState = timerStates.RUNNING;
    return this.startStudy();
  }

  startStudy(){
    this.tick('alert', 'starting study')
    this._currentTime = moment.duration(this._studyTime.asMilliseconds());
    this._timerCycle = timerCycles.STUDY;
  }

  startBreak(){
    this.tick('alert', 'starting break')
    this._currentTime = moment.duration(this._breakTime.asMilliseconds());
    this._timerCycle = timerCycles.BREAK;
  }

  reduceTimer() {
    if (this._currentTime.asSeconds() === 0 ) {
      if (this._timerCycle === timerCycles.STUDY) {
        return this.startBreak();
      } else {
        return this.startStudy();
      }
    }
    const currentMinutes = this._currentTime.minutes();
    const currentSeconds = this._currentTime.seconds();
    const timeString = `${pad(currentMinutes)}:${pad(currentSeconds)}`
    this.tick('time', timeString);
    return this._currentTime.subtract(1, 'second');
  }

  tick(type, str) {
    this.emit('tick', type, str);
  }

  pauseTimer() {
    this._timerState = timerStates.PAUSED;
    this.tick('alert', 'timer paused');
    clearInterval(this._countDown);
  }

  resumeTimer() {
    if (this._timerState === timerStates.RUNNING) {
      return;
    }
    this._timerState = timerStates.RUNNING;
    this.tick('alert', 'timer resumed');
    this._countDown = setInterval(() => this.reduceTimer(), 1000);
  }

  stopTimer() {
    clearInterval(this._countDown);
    this._currentTime = moment.duration(this._studyTime.asMilliseconds());
    this._timerState = timerStates.STOPPED;
    this.tick('alert', 'timer stopped');
  }

  get studyTime() {
    return this._studyTime.humanize();
  }

  get breakTime() {
    return this._breakTime.humanize();
  }

  accessTimer(command, studyTime, breakTime){
    console.log('timer access command received by timer!');
    switch (command){
      case 'stop':
        this.stopTimer();
        break;
      case 'pause':
        this.pauseTimer();
        break;
      case 'start':
        this.startTimer();
        break;
      case 'resume':
        this.resumeTimer();
        break;
      case 'setTime':
        this.setTimer(studyTime, breakTime);
        break;
      default:
        console.log('command not recognized');
    }
  }

}

module.exports = Timer;

/////////////////////////////////////
const t = new Timer([0, 8], [0, 3]);

// console.log(t.studyTime);
//t.startTimer();

t.accessTimer('setTime', [0, 10], [0, 5])

setTimeout(function() {
  t.accessTimer('start')
}, 3000);


setTimeout(function() {
  t.accessTimer('pause')
}, 5000);

setTimeout(function() {
  t.accessTimer('resume')
}, 7000);

setTimeout(function() {
  t.accessTimer('stop')
}, 10000);



t.on('tick', (type, data) => {
  console.log(type, data);
})
