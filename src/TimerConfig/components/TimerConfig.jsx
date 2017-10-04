import React, {Component} from 'react';

class TimerConfig extends Component {
  constructor(){
    super();
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(ev){
    const newStudyTime = this.props.studyTime;
    if (ev.target.id === 'study-minutes') newStudyTime.subtract(newStudyTime.get('minutes'), 'minutes').add(parseInt(ev.target.value, 10), 'minutes');
    if (ev.target.id === 'study-seconds') newStudyTime.subtract(newStudyTime.get('seconds'), 'seconds').add(parseInt(ev.target.value, 10), 'seconds');
    this.props.setStudyTime(newStudyTime);

    const newBreakTime = this.props.breakTime;
    if (ev.target.id === 'break-minutes') newBreakTime.subtract(newBreakTime.get('minutes'), 'minutes').add(parseInt(ev.target.value, 10), 'minutes');
    if (ev.target.id === 'break-seconds') newBreakTime.subtract(newBreakTime.get('seconds'), 'seconds').add(parseInt(ev.target.value, 10), 'seconds');
    this.props.setBreakTime(newBreakTime);

  }

  render() {
    return (
      <div className='row'>

        <h3 className='text-primary'>Set Timer</h3>

        <div className='row control-row'>
          <div className='form-group'>
            <div className='col-sm-3'>
              <label htmlFor='minutes'>Minutes</label>
            </div>
            <div className='col-sm-9'>
              <input 
                id='study-minutes'
                className='form-control' 
                type='number' 
                defaultValue={this.props.studyTime.get('minutes')}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>

        <div className='row control-row'>
          <div className='form-group'>
            <div className='col-sm-3'>
              <label htmlFor='seconds'>Seconds</label>
            </div>
            <div className='col-sm-9'>
              <input 
                id='study-seconds' 
                className='form-control' 
                type='number' 
                defaultValue={this.props.studyTime.get('seconds')}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>

        <h3 className='text-primary'>Set Break</h3>
        
        <div className='row control-row'>
          <div className='form-group'>
            <div className='col-sm-3'>
              <label htmlFor='minutes'>Minutes</label>
            </div>
            <div className='col-sm-9'>
              <input 
                id='break-minutes'
                className='form-control' 
                type='number' 
                defaultValue={this.props.breakTime.get('minutes')}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>

        <div className='row control-row'>
          <div className='form-group'>
            <div className='col-sm-3'>
              <label htmlFor='seconds'>Seconds</label>
            </div>
            <div className='col-sm-9'>
              <input 
                id='break-seconds' 
                className='form-control' 
                type='number' 
                defaultValue={this.props.breakTime.get('seconds')}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default TimerConfig;