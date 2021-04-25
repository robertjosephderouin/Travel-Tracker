import Trip from './Trip';
import State from './State';

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
  return new Promise((resolve, reject) => {
    State.currentUser.then(user => {
      const trip = {
        id: Math.floor(Math.random() * 100000),
        userID: user.id,
        duration: Number(duration),
        destinationID: Number(destination),
        travelers: Number(capacity),
        date: date,
        status: 'pending',
        suggestedActivities: [],
      };
      console.log(trip);
      fetch('http://localhost:3001/api/v1/trips', {
        method: 'POST',
        body: JSON.stringify(trip),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        TripRepository.trips.push(new Trip(trip));
        resolve();
      });
    });
  })
}
