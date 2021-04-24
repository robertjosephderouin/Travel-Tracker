export default class Trip {
  constructor(trip) {
    Object.assign(this, trip);
  }
  getDestination(){
    return DestinationRepository.getDestinations().then(data => data.find(destination => destination.id === this.destinationID));
  }
  getCost() {
    const costBeforeFee = (this.getDestination().estimatedLodgingCostPerDay * this.duration) + (this.getDestination().estimatedFlightCostPerPerson * this.travelers);
    const fee = costBeforeFee * .10;
    return costBeforeFee + fee;
  }
}