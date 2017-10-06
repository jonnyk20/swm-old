import React from 'react';

const Header = (props) => (
  <div className='row'>
    <div className='text-center'> Cycle: { props.timerCycle } </div>
    <div className='text-center'> Status: { props.timerState } </div>
  </div>
);

export default Header;