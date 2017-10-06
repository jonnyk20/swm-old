import React, {Component} from 'react';

class TimerConfig extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      studyMinutes: this.props.studyTime[0],
      studySeconds: this.props.studyTime[1],
      breakMinutes: this.props.breakTime[0],
      breakSeconds: this.props.breakTime[1]
    }
  }
  handleChange(ev){
    console.log(ev.target.id)
    this.setState({
      [ev.target.id]: parseInt(ev.target.value, 10)
    }, () => this.props.onSetTimer(this.state));
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

              <div className='col-sm-6'>
                <div className='row'>
                  Min
                </div>
                <div className='row'>
                  <input 
                      id='studyMinutes'
                      className='form-control' 
                      type='number' 
                      value={ this.state.studyMinutes }
                      onChange={ this.handleChange }
                    />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='row'>
                  Sec
                </div>
                <div className='row'>
                  <input 
                    id='studySeconds'
                    className='form-control' 
                    type='number' 
                    value={ this.props.studyTime[1] }
                    onChange={ this.handleChange }
                  />
                </div>
              </div>

            </div>
          </div>
          <div className='col-md-5'>
            <div className='row'>
              Break Time
            </div>
            <div className='row'>

              <div className='col-sm-6'>
                <div className='row'>
                  Min
                </div>
                <div className='row'>
                  <input 
                    id='breakMinutes'
                    className='form-control' 
                    type='number' 
                    value={ this.state.breakMinutes }
                    onChange={ this.handleChange }
                  />
                </div>
              </div>

              <div className='col-sm-6'>
                <div className='row'>
                  Sec
                </div>
                <div className='row'>
                  <input 
                    id='breakSeconds'
                    className='form-control' 
                    type='number' 
                    value={ this.state.breakSeconds }
                    onChange={ this.handleChange }
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TimerConfig;