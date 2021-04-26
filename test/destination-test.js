import chai from 'chai';
const expect = chai.expect;

const Destination = require('../src/Destination.js')

let sampleDestination = {
            "id": 1,
            "destination": "Lima, Peru",
            "estimatedLodgingCostPerDay": 70,
            "estimatedFlightCostPerPerson": 400,
            "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
            "alt": "overview of city buildings with a clear sky"
}

describe('Destination should be a class', function() {
  it('should be a function', function() {
    expect(Destination).to.be.a('function')
  });

});
