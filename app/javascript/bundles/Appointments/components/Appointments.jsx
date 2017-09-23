import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import axios from 'axios';
import AppointmentForm from './AppointmentForm';
import AppointmentsList from './AppointmentsList';

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
    }
  }

  componentDidMount() {
    axios.get('/appointments')
      .then((response) => {
        this.setState({ appointments: response.data })
      })
  }

  addNewAppointment = (appointment) => {
    const appointments = update(this.state.appointments, { $push: [appointment] });
    this.setState({
      appointments: appointments.sort((a, b) => new Date(b.appt_time) - new Date(a.appt_time)),
    });
  }

  render() {
    return (
      <div>
        <AppointmentForm handleNewAppointment={this.addNewAppointment} />
        <AppointmentsList appointments={this.state.appointments} />
      </div>
    )
  }
}

export default Appointments;
