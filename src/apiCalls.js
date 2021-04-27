import TripRepository from './TripRepository';
import Trip from './Trip';

export function getTripData(){
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json());
}
