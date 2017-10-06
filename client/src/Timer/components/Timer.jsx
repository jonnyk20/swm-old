import React, {Component} from 'react';
import moment from 'moment';
import TimerHeader from '../../TimerHeader/components/TimerHeader';
import TimerDisplay from '../../TimerDisplay/components/TimerDisplay';



class Timer extends Component {
  constructor() {
    super();
    this.state = {
      currentTime: moment.duration(2, 'minutes')
    };
  }

  render()
  {
    return (
      
      <div className='container-fluid'>
        
        <TimerHeader />
        <TimerDisplay 
          timestamp={ this.props.timestamp }
        />
      </div>
    );
  }
}

export default Timer;