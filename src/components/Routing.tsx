import React from 'react';
import { Reservation } from './Reservation';
import { Facility } from './Facility';
import { ReservationList } from './ReservationList';
import { Switch, Route } from 'react-router-dom';

export const Routing: React.FC = () => {
  return (
    <Switch>
      <Route path="/reservation" component={Reservation} />
      <Route path="/facility" component={Facility} />
      <Route path="/" exact component={ReservationList} />
    </Switch>
  );
};
