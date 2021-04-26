import chai from 'chai';
import Trip from '../src/Trip.js';
const expect = chai.expect;
var assert = require('chai').assert;

const sampleTrip = {
            "id": 1,
            "userID": 44,
            "destinationID": 49,
            "travelers": 1,
            "date": "2019/09/16",
            "duration": 8,
            "status": "approved",
            "suggestedActivities": []
            }

  describe('Trip', function() {

    it('should have a id', function() {
      var trip = new Trip(sampleTrip);

      assert.equal(trip.id, '1');

  });

    it('should have a user id', function() {
    var trip = new Trip(sampleTrip);

    assert.equal(trip.userID, '44');

  });


    it('should have a destination ID', function() {
    var trip = new Trip(sampleTrip);

    assert.equal(trip.destinationID, '49');

  });

    it('should have a number travelers', function() {
    var trip = new Trip(sampleTrip);

    assert.equal(trip.travelers, 1);

  });

    it('should have a date', function() {
    var trip = new Trip(sampleTrip);

    assert.equal(trip.date, "2019/09/16");

  });

    it('should have a duration', function() {
    var trip = new Trip(sampleTrip);

    assert.equal(trip.duration, 8);

  });

    it('should have a status', function() {
    var trip = new Trip(sampleTrip);

    assert.equal(trip.status, "approved");

  });

});
