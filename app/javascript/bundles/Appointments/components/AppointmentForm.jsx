import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import { validations } from '../utils/validations';
import Label from './Label';

class AppointmentForm extends React.Component{
  static propTypes = {
    title: PropTypes.shape({
      value: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
    }).isRequired,
    appt_time: PropTypes.shape({
      value: PropTypes.instanceOf(Date).isRequired,
      valid: PropTypes.bool.isRequired,
    }).isRequired,
    formValid: PropTypes.bool.isRequired,
    onUserInput: PropTypes.func.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static formValidations = {
    title: [
      (s) => { return(validations.checkMinLength(s, 3)) }
    ],
    appt_time: [
      (t) => { return(validations.timeShouldBeInTheFuture(t)) }
    ]
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.props.onUserInput(fieldName, fieldValue, AppointmentForm.formValidations[fieldName]);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit();
  }

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const fieldValue = e.toDate();
    this.props.onUserInput(fieldName, fieldValue, AppointmentForm.formValidations[fieldName]);
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
