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
             <h4>Study Time</h4>
            </div>
            <div className='row'>

              <div className='col-sm-3'>
                <div className='row'>
                  Min
                </div>
                <div className='row'>
                  <input 
                      id='study-minutes'
                      className='form-control' 
                      type='number' 
                      defaultValue={0}
                      onChange={this.handleChange}
                    />
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='row'>
                  Sec
                </div>
                <div className='row'>
                  <input 
                    id='study-seconds'
                    className='form-control' 
                    type='number' 
                    defaultValue={0}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

            </div>
          </div>
          <div className='col-md-5'>
            <div className='row'>
              <h4>Break Time</h4>
            </div>
            <div className='row'>

              <div className='col-sm-3'>
                <div className='row'>
                  Min
                </div>
                <div className='row'>
                  <input 
                    id='break-seconds'
                    className='form-control' 
                    type='number' 
                    defaultValue={0}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

              <div className='col-sm-3'>
                <div className='row'>
                  Sec
                </div>
                <div className='row'>
                  <input 
                    id='break-seconds'
                    className='form-control' 
                    type='number' 
                    defaultValue={0}
                    onChange={this.handleChange}
                  />
                </div>
              </div>

            </div>
          </div>
          <div className='col-md-1'>
            <button className='btn btn-primary' data-command='start' onClick={() => console.log('hey')}>Start</button>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerConfig;