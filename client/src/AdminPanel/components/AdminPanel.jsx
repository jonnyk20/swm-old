import React, { Component } from 'react';
import TimerConfig from '../../TimerConfig/components/TimerConfig.jsx';

class AdminPanel extends Component {
  constructor(props){
    super(props);
    this.onCommandClick = this.onCommandClick.bind(this);
    console.log(this.props.studyTime)
    
  }
  render() {
    return (
          <div>
            <div className='admin row'>
             
              <div className='col-sm-3'>
                <button className='btn btn-success' data-command='start' onClick={this.onCommandClick}>Start</button>
                <button className='btn btn-danger' data-command='stop' onClick={this.onCommandClick}>Stop</button>
                <button className='btn btn-primary' data-command='pause' onClick={this.onCommandClick}>Pause</button>
                <button className='btn btn-info' data-command='resume' onClick={this.onCommandClick}>Resume</button>
                <div >{ this.props.timestamp }</div>
              </div>
              
              <div className='col-md-5'>
                <TimerConfig 
                  studyTime={ this.props.studyTime }
                  breakTime={ this.props.breakTime }
                  onSetTimer={ this.props.onSetTimer }
                />
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

}
  
export default AdminPanel;