const { EventEmitter } = require('events');
const leftPad = require('left-pad');
const moment = require('moment');
const timerStates = require('./timerStates');
const pad = (num) => leftPad(num, 2, '0');

class Timer extends EventEmitter {
  constructor(StudyDuration, StudyUnits, BreakDuration, BreakUnits) {
    super();
    this._studyTime = moment.duration(StudyDuration, StudyUnits);
    this._breakTime = moment.duration(BreakDuration, BreakUnits);
    this._timerState = timerStates.STOPPED;
    console.log(`Timer::ctor`);
  }

  set duration(studyTime) {
    this._studyTime = studyTime; //mmt
  }
  
  startTimer() {
    this._countDown = setInterval(() => this.reduceTimer(), 1000);
    return this.startStudy();
  }

  startStudy(){
    this.tick('alert', 'starting study')
    this._currentTime = moment.duration(this._studyTime.asMilliseconds());
    this._timerState = timerStates.STUDY;
  }

  startBreak(){
    this.tick('alert', 'starting break')
    this._currentTime = moment.duration(this._breakTime.asMilliseconds());
    this._timerState = timerStates.BREAK;
  }

  reduceTimer() {
    if (this._currentTime.asSeconds() === 0 ) {
      if (this._timerState === timerStates.STUDY) {
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
    this.tick('alert', 'timer paused');
    clearInterval(this._countDown);
  }

  resumeTimer() {
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

}

module.exports = Timer;

/////////////////////////////////////
const t = new Timer(8, 'seconds', 3, 'seconds');

// console.log(t.studyTime);
t.startTimer();

// setTimeout(function() {
//   t.pauseTimer();
// }, 3000);


// setTimeout(function() {
//   t.resumeTimer();
// }, 5000);

// setTimeout(function() {
//   t.stopTimer();
// }, 7000);



t.on('tick', (type, data) => {
  console.log(type, data);
})
