import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import Label from './Label';

class AppointmentForm extends React.Component{
  handleChange = (e) => {
    const name = e.target.name;
    const obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setApptTime = (e) => {
    const name = 'appt_time';
    const obj = {};
    if (obj[name] = e.toDate()) {
      this.props.onUserInput(obj)
    }
  }

  render() {
    const inputProps = {
      name: 'appt_time',
    };

    return (
      <div>
        <h3>Make a new appointment</h3>
        <Label label='Enter a title, date and time' />
        <form onSubmit={this.handleSubmit}>
          <input name='title' placeholder='Appointment Title'
            value={this.props.title}
            onChange={this.handleChange}
          />
          <Datetime input={false} open
            inputProps={inputProps}
            value={moment(this.props.appt_time)}
            onChange={this.setApptTime}
          />
          <input
            className='submit-button'
            type='submit'
            value='Make Appointment'
            disabled={!this.props.formValid}
          />
        </form>
      </div>
    )
  }
}

export default AppointmentForm;
