const { EventEmitter } = require('events');
const leftPad = require('left-pad');
const moment = require('moment');

class Timer extends EventEmitter {
  constructor(duration) {
    super();
    console.log(`Timer::ctor`)
    this._duration = duration;
    this.setUpTimer(); 
  }

  setUpTimer() {
    if(this._timer) {
      clearInterval(this._timer);
    }
    this._timer = setInterval(() => this.tick(), this.duration * 1000);
  }

  tick() {
    // console.log(`Timer::tick(${this.duration})`);
    this.emit('tick', new Date().getTime());
  }

  start() {
    this.setUpTimer(this.duration);
  }

  stop() {
    clearInterval(this._timer);
  }

  get duration() {
    return this._duration;
  }

  set duration(value) {
    this._duration = value;
    this.setUpTimer();
  }
}

module.exports = Timer;