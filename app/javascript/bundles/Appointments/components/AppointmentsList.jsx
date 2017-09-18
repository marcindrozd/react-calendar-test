import React from 'react';
import Appointment from './Appointment';

const AppointmentsList = ({ appointments }) =>
  <div>
    { appointments.map((appointment) => {
      return (
        <Appointment appointment={appointment} key={appointment.id} />
      )
    }) }
  </div>

export default AppointmentsList;
