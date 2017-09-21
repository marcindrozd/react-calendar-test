import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import moment from 'moment';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';
import FormErrors from './FormErrors';

axios.defaults.headers.common['X-CSRF-Token'] = ReactOnRails.authenticityHeaders();
axios.defaults.headers.common['Accept'] = 'application/json';

class Appointments extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments,
      title: '',
      appt_time: '',
      formErrors: {},
      formValid: false,
    }
  }

  handleUserInput = (obj) => {
    this.setState(obj, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.title.trim().length > 2 &&
                               moment(this.state.appt_time).isValid() &&
                               moment(this.state.appt_time).isAfter() })
  }

  handleFormSubmit = () => {
    const appointment = { title: this.state.title, appt_time: this.state.appt_time };
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
