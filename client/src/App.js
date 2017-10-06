import React, { Component } from 'react';
import Timer from './Timer/components/Timer';
import './App.css';
import { subscribeToTimer, modifyTimer } from './socketConnect';
import AdminPanel from './AdminPanel/components/AdminPanel';

class App extends Component {
  constructor(){
    super();
    subscribeToTimer( 1000 , (err, timestamp) => this.setState({ 
      timestamp 
    }));
    this.controlTimer = this.controlTimer.bind(this)
  }
  state = {
    timestamp: 'no timestamp yet'
  };
  render() {
    return (
      <div className='container'>
         <AdminPanel 
          timestamp={ this.state.timestamp }
          controlTimer={ this.controlTimer }
          />
      <div className='panel panel-default app-content center-block'>
        <div className='panel-body'>
          <Timer timestamp={ this.state.timestamp }/>
        </div>
      </div>
      </div>
    );
  }
  controlTimer(command, newStudyTime, newBreakTime){
    modifyTimer(command, newStudyTime, newBreakTime)
  }
}

export default App;
