import React from 'react';
import * as timerStates from '../../timerStates';

// const leftPad = (val) => {
//   if (val < 10) return `0${val}`;

//   return `${val}`;
// };

const TimerDisplay = (props) => (
  <div>
    <div className='row center-block'>
      {
        (props.timerState === timerStates.BREAK) 
        && <h2 className='text-success text-center'> Time for a Break! </h2>
      }
      {
        (props.timerState === timerStates.RUNNING) 
        && <h2 className='text-primary text-center'> Time to Study! </h2>
      }
      </div>

      <div className='row'>
        <h2 className='text-center'>
          {/* {`${leftPad(props.currentTime.get('hours'))}:${leftPad(props.currentTime.get('minutes'))}:${leftPad(props.currentTime.get('seconds'))}`} */}
          {props.timestamp}
        </h2>
    </div>
</div>
);

export default TimerDisplay;