import chai from 'chai';
import User from '../src/User.js';
const expect = chai.expect;
var assert = require('chai').assert;

let sampleUser = {
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
}

  describe('User', function() {

    it('should have an id', function() {
      var user = new User(sampleUser);

      assert.equal(user.id, 1);

  });

    it('should have an id', function() {
      var user = new User(sampleUser);

      assert.equal(user.name, 'Ham Leadbeater');

  });

    it('should have an id', function() {
      var user = new User(sampleUser);

      assert.equal(user.travelerType, 'relaxer');

  });

});
