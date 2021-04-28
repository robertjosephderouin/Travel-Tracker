import User from './User';
import UserRepository from './UserRepository';

export default class State{}
State.currentUser = UserRepository.getUser(1).catch(e => alert("Failed to get user information, cannot access user data."));;
State.currentPage = "traveler";
