import React, { Component } from 'react';
import Timer from './Timer/components/Timer';
import './App.css';
import { subscribeToTimer, modifyTimer} from './socketConnect';
import AdminPanel from './AdminPanel/components/AdminPanel';
import ChatContainer from './Chat/ChatContainer.jsx';
import * as timerStates from './timerStates';
import * as timerCycles from './timerCycles';

class App extends Component {
  constructor(){
    super();
    subscribeToTimer(this.onTimerInitiated, this.onTimerUpdate, this.onUserCountChange);
    this.controlTimer = this.controlTimer.bind(this)
    this.onTimerUpdate = this.onTimerUpdate.bind(this)
    this.onTimerInitiated = this.onTimerInitiated.bind(this)
    this.onSetTimer = this.onSetTimer.bind(this);
    this.onUserCountChange = this.onUserCountChange.bind(this);

    this.state = {
      admin: false,
      timestamp: 'Waiting for Time',
      timerState: timerStates.STOPPED,
      timerCycle: timerCycles.STUDY,
      studyMinutes: 0,
      studySeconds: 0,
      breakMinutes: 0,
      breakSeconds: 0,
      onlineUsers: 0
    };
  }
  render() {
    return (
      <div>
        <button className='btn btn-default btn-sm btn-admin' onClick={()=> this.toggleAdmin()}>.</button>
        <div className='container'>
         { this.state.admin && <AdminPanel
            timestamp={ this.state.timestamp }
            controlTimer={ this.controlTimer }
            onSetTimer={ this.onSetTimer }
            studyMinutes={ this.state.studyMinutes }
            studySeconds={ this.state.studySeconds }
            breakMinutes={ this.state.breakMinutes }
            breakSeconds={ this.state.breakSeconds }
          /> }
            
        <div className='panel panel-default app-content center-block'>
          <div className='panel-body'>
            
            <Timer
              onlineUsers={ this.state.onlineUsers }
              timestamp={ this.state.timestamp }
              timerCycle={ this.state.timerCycle }
              timerState={ this.state.timerState }
            />
           
          </div>
        </div> 
        { (this.state.timerCycle !== timerCycles.BREAK) &&
          <div className='center-block text-center text-primary'> 
            Chat Window will appear during break periods
          </div>
        }
        
        { (this.state.timerCycle === timerCycles.BREAK) &&
          <ChatContainer
          onUserCountChange={ this.onUserCountChange }
         />
        }
        </div>
      </div>
    );
  }

  toggleAdmin(){
    this.setState({
      admin: !this.state.admin
    })
  }

  controlTimer(command, newStudyTime, newBreakTime){
    modifyTimer(command, newStudyTime, newBreakTime);
  }
  onTimerUpdate = (type, str) => {
    if (type === 'time') {
      this.setState({ 
      timestamp: str
    })
    } else if (type === 'timerState') {
      console.log('timer state received', type, str);
      this.setState({
        timerState: timerStates[str]
      });
    } else if (type === 'timerCycle') {
      console.log('timer cycle received', type, str);
      this.setState({
        timerCycle: timerCycles[str]
      });
    } else {
      console.log('unknown update type', type, str)
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
    this.setState({
      [timeProperty]: timeValue
    }, ()=>{
      this.controlTimer('setTime', [this.state.studyMinutes, this.state.studySeconds], [this.state.breakMinutes, this.state.breakSeconds])
    })
  }
  onUserCountChange = (newCount) => {
    console.log('user count updated! Now', parseInt(newCount, 10))
    this.setState({
      onlineUsers: parseInt(newCount, 10)
    })
  }
}

export default App;
