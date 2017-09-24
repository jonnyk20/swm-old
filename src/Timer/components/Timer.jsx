import React from 'react';
import TimerHeader from '../../TimerHeader/components/TimerHeader';
import TimerDisplay from '../../TimerDisplay/components/TimerDisplay';
import TimerButton from '../../TimerButton/components/TimerButton';
import TimerConfig from '../../TimerConfig/components/TimerConfig';

const Timer = () => (
  <div className='container-fluid'>
    <TimerHeader />
    <TimerDisplay />
    <TimerButton />
    <TimerConfig />
    
  </div>
);

export default Timer;