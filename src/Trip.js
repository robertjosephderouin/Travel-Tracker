import DestinationRepository from './DestinationRepository';

export default class Trip {
  constructor(trip) {
    Object.assign(this, trip);
  }
  getDestination(){
    return DestinationRepository.getDestinations().then(data => data.find(destination => destination.id === this.destinationID));
  }
  getCost() {
    return this.getDestination().then(destination => {
      const costBeforeFee = (destination.estimatedLodgingCostPerDay * this.duration) + (destination.estimatedFlightCostPerPerson * this.travelers);
      const fee = costBeforeFee * .10;
      return Promise.resolve(costBeforeFee + fee);
    });
  }
}