class AppointmentForm extends React.Component {
  render() {
    return (
      <div>
        <h3>Make a new appointment</h3>
        <form>
          <input name='title' placeholder='Appointment Title' />
          <input name='appt_time' placeholder='Date and Time' />
          <input type='submit' value='Make Appointment' />
        </form>
      </div>
    )
  }
}
