import Trip from './Trip';

export default class User {
  constructor(user) {
    Object.assign(this, user);
    this.trips = [];
  }
  getTrips(){
    if(this.trips.length > 0){
      return Promise.resolve(this.trips);
    }
    return fetch('http://localhost:3001/api/v1/trips')
      .then(response => response.json())
      .then(data => {
        this.trips = data.filter(trip => trip.userID === this.id).map(trip => new Trip(trip));
        return this.trips;
      });
  }
  getTotalAmountSpent() {

  }
}