import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Appointments from './Appointments';
import Appointment from './Appointment';
import AppHeader from './AppHeader';

const AppRouter = (props) => {
  return (
    <Router>
      <div>
        <AppHeader />
        <Route exact path="/" render={routeProps => (
          <Appointments {...routeProps} appointments={props.appointments} />
        )} />
        <Route path="/appointments/:id" component={Appointment} />
      </div>
    </Router>
  )
}

export default AppRouter;
