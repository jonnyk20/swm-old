import React, {Component} from 'react';

class TimerConfig extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev){
    console.log('yah')
  }

  render() {
    return (
      <div>
        <div className='row'>
          <div className='col-md-5'>
            <div className='row'>
              Study Time
            </div>
            <div className='row'>
              <div className='col-sm-3'>
                x1
              </div>
              <div className='col-sm-3'>
                x2
              </div>
              <div className='col-sm-3'>
                x3
              </div>
              <div className='col-sm-3'>
                x4
              </div>
            </div>
          </div>
          <div className='col-md-5'>
            <div className='row'>
              Break Time
            </div>
            <div className='row'>
              <div className='col-sm-3'>
                  y1
                </div>
                <div className='col-sm-3'>
                  y2
                </div>
                <div className='col-sm-3'>
                  y3
                </div>
                <div className='col-sm-3'>
                  y4
                </div>
            </div>
          </div>
          <div className='col-md-2'>
              [button]
          </div>
        </div>
      </div>
    );
  }
}

export default TimerConfig;