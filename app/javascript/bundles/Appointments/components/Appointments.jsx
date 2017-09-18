import React from 'react';
import update from 'immutability-helper';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';

class Appointments extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      appointments: props.appointments,
      title: 'Standup meeting',
      appt_time: 'Tomorrow at 9am',
    }
  }

  handleUserInput(obj) {
    this.setState(obj);
  }

  handleFormSubmit() {
    const appointment = { title: this.state.title, appt_time: this.state.appt_time };
    axios.post('/appointments', { appointment: appointment })
      .then((response) => { this.addNewAppointment(response.data) });
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
        <AppointmentForm
          title={this.state.title}
          appt_time={this.state.appt_time}
          onUserInput={(obj) => this.handleUserInput(obj)}
          onFormSubmit={() => this.handleFormSubmit()}
        />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

export default Appointments;
