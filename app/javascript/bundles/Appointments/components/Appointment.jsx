import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/format';

class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appointment: props.appointment
    }
  }

  static propTypes = {
    appointment: PropTypes.object.isRequired
  }

  static defaultProps = {
    appointment: {}
  }

  componentDidMount() {
    if (this.props.match) {
      axios.get(`/appointments/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({ appointment: response.data })
        })
    }
  }

  render() {
    return (
      <div className='appointment'>
        <Link to={`/appointments/${this.state.appointment.id}`}>
          <h3>{this.state.appointment.title}</h3>
        </Link>
        <p>{formatDate(this.state.appointment.appt_time)}</p>
        <Link to={`/appointments/${this.state.appointment.id}/edit`}>
          Edit
        </Link>
      </div>
    )
  }
}

export default Appointment;
