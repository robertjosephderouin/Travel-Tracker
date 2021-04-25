import Trip from './Trip';
import State from './State';
import {
  isAfter,
  parse,
  sub,
} from 'date-fns';


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

TripRepository.getTripsForLastYear = () => {
  return TripRepository.getTrips().then(data => data.filter(trip => {
    const lastYear = sub(new Date(), {years: 1});
    const formatDate = parse(trip.date, 'y/MM/dd', new Date());
    return isAfter(formatDate, lastYear);
  }));
}

TripRepository.calculateAgentEarnings = async () => {
    const trips = await TripRepository.getTripsForLastYear();
    let allTrips = 0;
    for(const trip of trips) {
      const cost = (await trip.getCost()).fee;
      allTrips += cost;
    }
    return allTrips;
}

TripRepository.newTrip = (trip) => {
  return new Promise((resolve, reject) => {
    State.currentUser.then(user => {
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

TripRepository.deleteTrip = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3001/api/v1/trips/${id}`, {
      method: 'DELETE'
    }).then(() => {
      TripRepository.getTrips().then(trips => {
        const deletedTrip = trips.findIndex(trip => trip.id === id)
        trips.splice(deletedTrip, 1);
        resolve();
      })
    })
  })
}

TripRepository.approveTrip = (id) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3001/api/v1/updateTrip', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        id: id,
        status: 'approved',
      }),
    }).then(() => {
      TripRepository.getTrips().then(trips => {
        const approvedTrip = trips.find(trip => trip.id === id)
        approvedTrip.status = 'approved';
        resolve();
      })
    })
  })
}