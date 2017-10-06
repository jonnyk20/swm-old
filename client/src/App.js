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
      studyMinutes: 0,
      studySeconds: 0,
      breakMinutes: 0,
      breakSeconds: 0,
    };
  }
  render() {
    return (
      <div className='container'>
        <AdminPanel
          timestamp={ this.state.timestamp }
          controlTimer={ this.controlTimer }
          onSetTimer={ this.onSetTimer }
          studyMinutes={ this.state.studyMinutes }
          studySeconds={ this.state.studySeconds }
          breakMinutes={ this.state.breakMinutes }
          breakSeconds={ this.state.breakSeconds }
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
      studyMinutes,
      studySeconds,
      breakMinutes,
      breakSeconds,
      timerState: timerStates[timerState],
      timerCycle: timerCycles[timerCycle],
    }, cb);
  }
  onSetTimer(timeProperty, timeValue){
    console.log('Time prop: ', timeProperty, 'Time Value: ', timeValue )
    this.setState({
      [timeProperty]: timeValue
    }, ()=>{
      this.controlTimer('setTime', [this.state.studyMinutes, this.state.studySeconds], [this.state.breakMinutes, this.state.breakSeconds])
    })
  }
}

export default App;
