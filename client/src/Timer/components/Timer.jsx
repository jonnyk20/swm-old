import React, {Component} from 'react';
import moment from 'moment';
import TimerHeader from '../../TimerHeader/components/TimerHeader';
import TimerDisplay from '../../TimerDisplay/components/TimerDisplay';
import TimerButton from '../../TimerButton/components/TimerButton';
import TimerConfig from '../../TimerConfig/components/TimerConfig';
import * as timerStates from '../../timerStates';

class Timer extends Component {
  constructor() {
    super();

    this.state = {
      currentTime: moment.duration(2, 'minutes'),
      studyTime: moment.duration(2, 'minutes'), // change to 45
      breakTime: moment.duration(1, 'minutes'), // change to 0
      timerState: timerStates.NOT_SET,
      timer: null,
    };
    this.setStudyTime = this.setStudyTime.bind(this);
    this.setBreakTime = this.setBreakTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.reduceTimer = this.reduceTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
  }

  setStudyTime(newStudyTime){
    this.setState({
      studyTime: newStudyTime,
      currentTime: newStudyTime,
    });
  }

  setBreakTime(newBreakTime){
    this.setState({
      breakTime: newBreakTime
    });
  }

  startTimer() {
    this.setState({
      timerState: timerStates.RUNNING,
      timer: setInterval(this.reduceTimer, 1000)
    });
  }
  
  stopTimer() {
    if (this.state.timer){
      clearInterval(this.state.timer);
    }

    this.setState({
      timerState: timerStates.NOT_SET,
      timer: null,
      currentTime: moment.duration(this.state.studyTime)
    });
  }

  pauseTimer() {
    this.setState({
      timerState: timerStates.PAUSED
    });
    if (this.state.timer){
      clearInterval(this.state.timer);
    }
  }

  reduceTimer(){
    if (this.state.currentTime.get('hours') === 0 &&
          this.state.currentTime.get('minutes') === 0 &&
          this.state.currentTime.get('seconds') === 0) {
        this.completeTimer();
        return;
        }

    const newTime = moment.duration(this.state.currentTime);
    newTime.subtract(1, 'second');

    this.setState({
      currentTime: newTime,
    });
  }

  completeTimer() {
    if (this.state.timerState === timerStates.RUNNING) {
      this.setState({
      timerState: timerStates.BREAK,
      currentTime: moment.duration(this.state.breakTime)
      })
    } else {
      this.setState({
      timerState: timerStates.RUNNING,
      currentTime: moment.duration(this.state.studyTime)
      });
    }
  }

  render()
  {
    return (
      <div className='container-fluid'>
        <TimerHeader />
        <TimerDisplay 
          currentTime={this.state.currentTime}
          timerState={this.state.timerState}
          timestamp={ this.props.timestamp }
        />
        <TimerButton 
          startTimer={this.startTimer}
          stopTimer={this.stopTimer}
          pauseTimer={this.pauseTimer}
          timerState={this.state.timerState}
        />
        {
          (this.state.timerState !== timerStates.RUNNING)
          &&
          (<TimerConfig 
              studyTime={this.state.studyTime}
              setStudyTime={this.setStudyTime}
              breakTime={this.state.breakTime}
              setBreakTime={this.setBreakTime}
            />)
        }
      </div>
    );
  }
}

export default Timer;