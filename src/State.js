import UserRepository from './UserRepository';

export default class State{}
State.currentUser = UserRepository.getUser(50);
State.currentPage = "traveler";