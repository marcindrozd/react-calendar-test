class AppointmentsList extends React.Component {
  render() {
    return (
      <div>
        { this.props.appointments.map((appointment) => {
          return (
            <Appointment appointment={appointment} key={appointment.id} />
          )
        }) }
      </div>
    )
  }
}
