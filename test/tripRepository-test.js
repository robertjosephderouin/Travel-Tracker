import chai from 'chai';
import sinon from 'sinon';
import TripRepository from '../src/TripRepository.js';
import Trip from '../src/Trip.js';
import * as apiCalls from '../src/apiCalls.js';
const expect = chai.expect;
var assert = require('chai').assert;

  describe('TripRepository', function() {

  it('it should return an array of trips equal to the data length', async function() {
      TripRepository.trips = [new Trip({
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2019/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        })]
      const sampleGetTrips = await TripRepository.getTrips();
      assert.equal(sampleGetTrips.length, 1);
  });

  it('it should return an array of trip class', async function() {
      TripRepository.trips = [new Trip({
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2019/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        })]
      const sampleGetTrips = await TripRepository.getTrips();
      assert.instanceOf(sampleGetTrips[0], Trip);
  });

  it('it should return an empty array when no trips in data are from last year', async function() {
      TripRepository.trips = [new Trip({
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2019/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        })]
      const sampleGetTripsFromLastYear = await TripRepository.getTripsForLastYear();
      assert.equal(sampleGetTripsFromLastYear.length, 0);
  });

  it('it should return an array of trips in data from last year', async function() {
      TripRepository.trips = [new Trip({
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2021/04/25",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        })]
      const sampleGetTripsFromLastYear = await TripRepository.getTripsForLastYear();
      assert.equal(sampleGetTripsFromLastYear.length, 1);
  });

  it('it should return no trips that are on the same day if there are none in the data', async function() {
      TripRepository.trips = [new Trip({
          "id": 1,
          "userID": 44,
          "destinationID": 49,
          "travelers": 1,
          "date": "2019/09/16",
          "duration": 8,
          "status": "approved",
          "suggestedActivities": []
        })]
      const sampleGetTripsForToday = await TripRepository.getTripsForSameDay();
      assert.equal(sampleGetTripsForToday.length, 0);
  });

});
