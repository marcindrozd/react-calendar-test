var AppointmentForm = React.createClass({
  handleChange: function(e) {
    var name = e.target.name;
    var obj = {};
    obj[name] = e.target.value;
    this.props.onUserInput(obj);
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.props.onFormSubmit();
  },

  setApptTime: function(e) {
    var name = 'appt_time';
    var obj = {};
    if (obj[name] = e.toDate()) {
      this.props.onUserInput(obj)
    }
  },

  render: function() {
    var inputProps = {
      name: 'appt_time',
    };

    return (
      <div>
        <h3>Make a new appointment</h3>
        <form onSubmit={this.handleSubmit}>
          <input name='title' placeholder='Appointment Title'
            value={this.props.title}
            onChange={this.handleChange}
          />
          <Datetime input={false} open
            inputProps={inputProps}
            value={this.props.appt_time}
            onChange={this.setApptTime}
          />
          <input type='submit' value='Make Appointment' />
        </form>
      </div>
    )
  }
})