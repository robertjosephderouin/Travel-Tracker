import chai from 'chai';
import State from '../src/State.js';
const expect = chai.expect;
var assert = require('chai').assert;

  describe('State', function() {

    it('should have a current user by default be null', function() {
      var state = new State();

      assert.equal(state.currentUser, null);

  });

    it('should have a current page by default be undefined', function() {
      var state = new State();

      assert.equal(state.currentPage, undefined);

  });

});
