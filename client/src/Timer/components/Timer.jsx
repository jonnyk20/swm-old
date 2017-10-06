import React, {Component} from 'react';
import TimerHeader from '../../TimerHeader/components/TimerHeader';
import TimerDisplay from '../../TimerDisplay/components/TimerDisplay';



class Timer extends Component {
  render()
  {
    return (
      
      <div className='container-fluid'>
        
        <TimerHeader 
          timerState={ this.props.timerState }
          timerCycle={ this.props.timerCycle }
        />
        <TimerDisplay 
          timestamp={ this.props.timestamp }
        />
      </div>
    );
  }
}

export default Timer;