import React, { Component } from 'react';
import TimerConfig from '../../TimerConfig/components/TimerConfig.jsx';

class AdminPanel extends Component {
  constructor(props){
    super(props);
    this.onHandleClick = this.onHandleClick.bind(this);
  }
  render() {
    return (
          <div className='panel panel-default'>
            <div className='admin row'>
             
              <div className='col-sm-4'>
                <button className='btn btn-primary' data-command='start' onClick={this.onHandleClick}>Start</button>
                <button className='btn btn-danger' data-command='stop' onClick={this.onHandleClick}>Stop</button>
                <button className='btn btn-default' data-command='pause' onClick={this.onHandleClick}>Pause</button>
                <button className='btn btn-info' data-command='resume' onClick={this.onHandleClick}>Resume</button>
                <div >{ this.props.timestamp }</div>
              </div>
              <div className='col-md-4'>
                <TimerConfig />
              </div>
            </div>
          </div>
      )
  }
  onHandleClick(event){
    const command = event.target.dataset.command;
    console.log('command clicked', command)
    this.props.controlTimer(command)
  }
}
  
export default AdminPanel;