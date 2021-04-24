import UserRepository from './UserRepository';

export default class State{}
State.currentUser = UserRepository.getUser(1);
State.currentPage = "traveler";