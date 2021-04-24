import User from './User';

export default class UserRepository {
  static users = [];
  static getUsers(){
    if(UserRepository.users.length > 0){
      return Promise.resolve(UserRepository.users);
    }
    return fetch('http://localhost:3001/api/v1/travelers')
      .then(response => response.json())
      .then(data => {
        UserRepository.users = data.map(user => new User(user));
        return UserRepository.users;
      });
    }
  }
  getUser(id){
    if(UserRepository.users.length > 0){
      return Promise.resolve(UserRepository.users.find(user => user.id === id));
    }
    return fetch('http://localhost:3001/api/v1/travelers/' + id)
      .then(response => response.json())
      .then(data => new User(data));
  }
}