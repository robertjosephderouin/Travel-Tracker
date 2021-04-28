import chai from 'chai';
import User from'../src/User';
import UserRepository from'../src/UserRepository';
const expect = chai.expect;
var assert = require('chai').assert;

describe('UserRepository', function() {

  it('it should return a number of users equal to the data length', async function() {
      UserRepository.users = [new User(
        {
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
        })]
      const sampleGetUsers = await UserRepository.getUsers();
      assert.equal(sampleGetUsers.length, 1);
  });

  it('it should return a number of users equal to the data length', async function() {
      UserRepository.users = [new User(
        {
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
        })]
      const sampleGetUsers = await UserRepository.getUsers();
      assert.instanceOf(sampleGetUsers[0], User);
  });

  it('it should return a specific instance of user via ID and get their name', async function() {
      UserRepository.users = [new User(
        {
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
        }),
        new User({
            "id": 2,
            "name": "Rachael Vaughten",
            "travelerType": "thrill-seeker"
        })]
      const sampleGetUser = await UserRepository.getUser(2);
      assert.instanceOf(sampleGetUser, User);
      assert.equal(sampleGetUser.name, "Rachael Vaughten");
  });

  it('it should return undefined if no user id exists', async function() {
      UserRepository.users = [new User(
        {
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
        }),
        new User({
            "id": 2,
            "name": "Rachael Vaughten",
            "travelerType": "thrill-seeker"
        })]
      const sampleGetUser = await UserRepository.getUser(0);
      assert.equal(sampleGetUser, undefined);
  });

});
