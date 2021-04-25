import {
  isAfter,
  parse,
  sub,
} from 'date-fns';

import TripRepository from './TripRepository';

export default class User {
  constructor(user) {
    Object.assign(this, user);
  }
  getTrips(){
    return TripRepository.getTrips().then(data => data.filter(trip => trip.userID === this.id))
  }
  getTripsForLastYear(){
    return this.getTrips().then(data => data.filter(trip => {
      const lastYear = sub(new Date(), {years: 1});
      const formatDate = parse(trip.date, 'y/MM/dd', new Date());
      return isAfter(formatDate, lastYear);
    }));
  }
}