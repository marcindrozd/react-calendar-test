import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import Label from './Label';

class AppointmentForm extends React.Component{
  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onUserInput(fieldName, fieldValue);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const fieldValue = e.toDate();
    this.props.onUserInput(fieldName, fieldValue);
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
            value={this.props.title.value}
            onChange={this.handleChange}
          />
          <Datetime input={false} open
            inputProps={inputProps}
            value={moment(this.props.appt_time.value)}
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
