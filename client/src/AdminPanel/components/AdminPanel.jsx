import React, { Component } from 'react';
import TimerConfig from '../../TimerConfig/components/TimerConfig.jsx';

class AdminPanel extends Component {
  constructor(props){
    super(props);
    this.onCommandClick = this.onCommandClick.bind(this);
    this.onSetTimer = this.onSetTimer.bind(this);
  }
  render() {
    return (
          <div>
            <div className='admin row'>
             
              <div className='col-sm-3'>
                <button className='btn btn-success' data-command='start' onClick={() => this.onTestClick()}>Start</button>
                <button className='btn btn-danger' data-command='stop' onClick={this.onCommandClick}>Stop</button>
                <button className='btn btn-primary' data-command='pause' onClick={this.onCommandClick}>Pause</button>
                <button className='btn btn-info' data-command='resume' onClick={this.onCommandClick}>Resume</button>
                <div >{ this.props.timestamp }</div>
              </div>
              
              <div className='col-md-5'>
                <TimerConfig onSetTimer={ this.onSetTimer }/>
              </div>
            </div>
          </div>
      )
  }
  onCommandClick(event){
    console.log('click!')
    const command = event.target.dataset.command;
    console.log('command clicked', command)
    this.props.controlTimer(command)
  }
  onTestClick(){
    console.log('click handler')
  }
  onSetTimer({ studyMinutes, studySeconds, breakMinutes, breakSeconds}){
    console.log("timer is set")
    this.props.controlTimer('setTimer', [studyMinutes, studySeconds], [breakMinutes, breakSeconds])
  }
}
  
export default AdminPanel;