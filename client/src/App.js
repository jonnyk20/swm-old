import React, { Component } from 'react';
import Timer from './Timer/components/Timer';
import './App.css';
import { subscribeToTimer, modifyTimer} from './socketConnect';
import AdminPanel from './AdminPanel/components/AdminPanel';
import * as timerStates from './timerStates';
import * as timerCycles from './timerCycles';

class App extends Component {
  constructor(){
    super();
    //getTimerStatus(this.onTimerInitiated)
    subscribeToTimer(this.onTimerInitiated, this.onTimerUpdate);
    this.controlTimer = this.controlTimer.bind(this)
    this.onTimerUpdate = this.onTimerUpdate.bind(this)
    this.onTimerInitiated = this.onTimerInitiated.bind(this)
    this.onSetTimer = this.onSetTimer.bind(this);
    this.state = {
      timestamp: 'Waiting for Time',
      timerState: timerStates.STOPPED,
      timerCycle: timerCycles.STUDY,
      studyTime: [0, 0],
      breakTime: [0, 0]
    };
  }
  render() {
    return (
      <div className='container'>
        <AdminPanel
          timestamp={ this.state.timestamp }
          controlTimer={ this.controlTimer }
          studyTime={ this.state.studyTime }
          breakTime={ this.state.breakTime }
          onSetTimer={ this.onSetTimer }
        />
          
      <div className='panel panel-default app-content center-block'>
        <div className='panel-body'>
          <h4 className='text-center'> Study With Me</h4>
          <Timer 
            timestamp={ this.state.timestamp }
            timerCycle={ this.state.timerCycle }
            timerState={ this.state.timerState }
          />
        </div>
      </div>
      </div>
    );
  }
  controlTimer(command, newStudyTime, newBreakTime){
    modifyTimer(command, newStudyTime, newBreakTime);
  }
  onTimerUpdate = (type, str) => {
    console.log('timer updated:', type, str)
    if (type === 'time') {
      this.setState({ 
      timestamp: str
    })
    }
  }
  onTimerInitiated = (err, timerStatus, cb) =>{
    console.log('setting state...')
    const {
      studyMinutes,
      studySeconds,
      breakMinutes,
      breakSeconds,
      timerState,
      timerCycle
    } = JSON.parse(timerStatus);
    this.setState({
      studyTime: [studyMinutes, studySeconds],
      breakTime: [breakMinutes, breakSeconds],
      timerState: timerStates[timerState],
      timerCycle: timerCycles[timerCycle],
    }, cb);
  }
  onSetTimer({ studyMinutes, studySeconds, breakMinutes, breakSeconds }){
    this.controlTimer('setTime', [studyMinutes, studySeconds], [breakMinutes, breakSeconds])
    this.setState({
      studyTime: [studyMinutes, studySeconds],
      breakTime: [breakMinutes, breakSeconds]
    })
  }
}

export default App;
