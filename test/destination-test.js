import chai from 'chai';
import Destination from '../src/Destination.js';
const expect = chai.expect;
var assert = require('chai').assert;

let sampleDestination = {
            "id": 1,
            "destination": "Lima, Peru",
            "estimatedLodgingCostPerDay": 70,
            "estimatedFlightCostPerPerson": 400,
            "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
            "alt": "overview of city buildings with a clear sky"
}

  describe('Destination', function() {

    it('should have a id', function() {
      var destination = new Destination(sampleDestination);

      assert.equal(destination.id, '1');

  });

    it('should have a destination', function() {
      var destination = new Destination(sampleDestination);

      assert.equal(destination.destination, 'Lima, Peru');

  });


    it('should have a lodging cost per day', function() {
      var destination = new Destination(sampleDestination);

      assert.equal(destination.estimatedLodgingCostPerDay, 70);

  });


    it('should have a lodging cost per person', function() {
      var destination = new Destination(sampleDestination);

      assert.equal(destination.estimatedFlightCostPerPerson, 400);

  });

    it('should have an alt text', function() {
    var destination = new Destination(sampleDestination);

    assert.equal(destination.alt, "overview of city buildings with a clear sky");

  });

});
