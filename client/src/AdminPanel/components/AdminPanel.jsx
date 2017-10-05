import React, { Component } from 'react';

class AdminPanel extends Component {
  render() {
    return (<div>
              <div>{ this.props.timestamp }</div>
            </div>
      )
  }
}
  

export default AdminPanel;