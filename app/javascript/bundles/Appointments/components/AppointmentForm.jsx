import React from 'react';
import PropTypes from 'prop-types';
import Datetime from 'react-datetime';
import moment from 'moment';
import axios from 'axios';
import { validations } from '../utils/validations';
import update from 'immutability-helper';
import Label from './Label';
import FormErrors from './FormErrors';

class AppointmentForm extends React.Component{
  static propTypes = {
    handleNewAppointment: PropTypes.func
  }

  static formValidations = {
    title: [
      (s) => { return(validations.checkMinLength(s, 3)) }
    ],
    appt_time: [
      (t) => { return(validations.timeShouldBeInTheFuture(t)) }
    ]
  }

  constructor(props) {
    super(props);

    this.state = {
      title: { value: '', valid: false },
      appt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false,
      editing: false,
    }
  }

  componentDidMount() {
    if (this.props.match) {
      axios.get(`/appointments/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({
                          title: { value: response.data.title, valid: true },
                          appt_time: { value: response.data.appt_time, valid: true },
                          editing: this.props.match.path === '/appointments/:id/edit'
                        })
        })
    }
  }

  handleUserInput = (fieldName, fieldValue, validations) => {
    const newFieldState = update(this.state[fieldName], { value: { $set: fieldValue }});
    this.setState({ [fieldName]: newFieldState },
                  () => this.validateField(fieldName, fieldValue, validations));
  }

  validateField(fieldName, fieldValue, validations) {
    let fieldValid;
    let fieldErrors = validations.reduce((errors, v) => {
      let e = v(fieldValue);
      if (e !== '') {
        errors.push(e);
      }

      return errors;
    }, []);

    fieldValid = fieldErrors.length === 0;

    const newFormErrors = update(this.state.formErrors, { $merge: { [fieldName]: fieldErrors } });
    const newFieldState = update(this.state[fieldName], { valid: { $set: fieldValid }});
    this.setState({ [fieldName]: newFieldState, formErrors: newFormErrors }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.title.valid && this.state.appt_time.valid })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.state.editing ?
      this.updateAppointment() :
      this.addAppointment()
  }

  addAppointment() {
    const appointment = { title: this.state.title.value, appt_time: this.state.appt_time.value };
    axios.post('/appointments', { appointment: appointment })
      .then((response) => {
        this.props.handleNewAppointment(response.data);
        this.resetFormErrors();
      })
      .catch((error) => {
        this.setState({ formErrors: error.response.data, formValid: false })
      });
  }

  updateAppointment() {
    const appointment = { title: this.state.title.value, appt_time: this.state.appt_time.value };
    axios.patch(`/appointments/${this.props.match.params.id}`, { appointment: appointment })
      .then((response) => {
        console.log('appointment updated!');
        this.resetFormErrors();
      })
      .catch((error) => {
        this.setState({ formErrors: error.response.data, formValid: false })
      });
  }

  deleteAppointment = () => {
    if(confirm('Are you sure you want to delete this appointment?')) {
      axios.delete(`/appointments/${this.props.match.params.id}`)
        .then((response) => {
          this.props.history.push('/');
          this.resetFormErrors();
        })
        .catch((error) => {
          console.log('could not delete the appointment')
        });
    }
  }

  resetFormErrors() {
    this.setState({ formErrors: {} })
  }

  handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    this.handleUserInput(fieldName, fieldValue, AppointmentForm.formValidations[fieldName]);
  }

  setApptTime = (e) => {
    const fieldName = 'appt_time';
    const fieldValue = e.toDate();
    this.handleUserInput(fieldName, fieldValue, AppointmentForm.formValidations[fieldName]);
  }

  render() {
    const inputProps = {
      name: 'appt_time',
    };

    return (
      <div>
        <h3>
          { this.state.editing ? `Edit appointment: ${this.state.title.value}` : 'Make a new appointment' }
        </h3>
        <FormErrors formErrors = {this.state.formErrors} />
        <Label label='Enter a title, date and time' />
        <form onSubmit={this.handleSubmit}>
          <input name='title' placeholder='Appointment Title'
            value={this.state.title.value}
            onChange={this.handleChange}
          />
          <Datetime input={false} open
            inputProps={inputProps}
            value={moment(this.state.appt_time.value)}
            onChange={this.setApptTime}
          />
          <input
            className='submit-button'
            type='submit'
            value={ this.state.editing ? 'Update Appointment' : 'Make Appointment' }
            disabled={!this.state.formValid}
          />
          { this.state.editing && (
              <p>
                <button onClick={this.deleteAppointment} type='button'>
                  Delete appointment
                </button>
              </p>
            )
          }
        </form>
      </div>
    )
  }
}

export default AppointmentForm;
