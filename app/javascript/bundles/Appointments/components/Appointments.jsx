import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';
import moment from 'moment';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import FormErrors from './FormErrors';

axios.defaults.headers.common['X-CSRF-Token'] = ReactOnRails.authenticityHeaders();
axios.defaults.headers.common['Accept'] = 'application/json';

class Appointments extends React.Component{
  static propTypes = {
    appointments: PropTypes.array.isRequired,
  }

  static defaultProps = {
    appointments: []
  }

  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments,
      title: { value: '', valid: false },
      appt_time: { value: new Date(), valid: false },
      formErrors: {},
      formValid: false,
    }
  }

  componentDidMount() {
    axios.get('/appointments')
      .then((response) => {
        this.setState({ appointments: response.data })
      })
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

  handleFormSubmit = () => {
    const appointment = { title: this.state.title.value, appt_time: this.state.appt_time.value };
    axios.post('/appointments', { appointment: appointment })
      .then((response) => {
        this.addNewAppointment(response.data);
        this.resetFormErrors();
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({ formErrors: error.response.data })
      });
  }

  resetFormErrors() {
    this.setState({ formErrors: {} })
  }

  addNewAppointment(appointment) {
    const appointments = update(this.state.appointments, { $push: [appointment] });
    this.setState({
      appointments: appointments.sort((a, b) => new Date(b.appt_time) - new Date(a.appt_time)),
    });
  }

  render() {
    return (
      <div>
        <FormErrors formErrors = {this.state.formErrors} />
        <AppointmentForm
          title={this.state.title}
          appt_time={this.state.appt_time}
          onUserInput={this.handleUserInput}
          onFormSubmit={this.handleFormSubmit}
          formValid={this.state.formValid}
        />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

export default Appointments;
