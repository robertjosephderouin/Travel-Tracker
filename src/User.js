import TripRepository from './TripRepository';

export default class User {
  constructor(user) {
    Object.assign(this, user);
  }
  getTrips(){
    return TripRepository.getTrips().then(data => data.filter(trip => trip.userID === this.id))
  }
}