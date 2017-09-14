class Appointments extends React.Component {
  render() {
    return (
      <div>
        <AppointmentForm />
        <AppointmentsList appointments={this.props.appointments} />
      </div>
    )
  }
}
