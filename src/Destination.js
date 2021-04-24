export default class Destination {
  constructor(id, destination, estimatedLodgingCost, estimatedFlightCost, image, alt) {
    this.id = id;
    this.destination = destination;
    this.estimatedLodgingCost = estimatedLodgingCost;
    this.estimatedFlightCost = estimatedFlightCost;
    this.image = image;
    this.alt = alt;
  }
}