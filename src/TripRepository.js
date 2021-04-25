import Trip from './Trip';

export default class TripRepository {}

TripRepository.trips = [];

TripRepository.getTrips = () => {
  if(TripRepository.trips.length > 0){
    return Promise.resolve(TripRepository.trips);
  }
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .then(data => {
      TripRepository.trips = data.trips.map(trip => new Trip(trip));
      return TripRepository.trips;
    });
}

TripRepository.newTrip = (date, duration, capacity, destination) => {

}