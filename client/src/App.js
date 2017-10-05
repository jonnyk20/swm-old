import React, { Component } from 'react';
import Timer from './Timer/components/Timer';
import './App.css';
import { subscribeToTimer } from './socketConnect';
import AdminPanel from './AdminPanel/components/AdminPanel';

class App extends Component {
  constructor(){
    super();
    subscribeToTimer( 1000 , (err, timestamp) => this.setState({ 
      timestamp 
    }));
  }
  state = {
    timestamp: 'no timestamp yet'
  };
  render() {
    return (
      <div className='panel panel-default app-content center-block'>
        <div className='panel-body'>
          <AdminPanel timestamp={ this.state.timestamp }/>
          <Timer timestamp={ this.state.timestamp }/>
        </div>
      </div>
    );
  }
}

export default App;
